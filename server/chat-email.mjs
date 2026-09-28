// This adapter serves local Vite development only. Keep credentials server-side.
const names = {doctor:'의사',pharmacist:'약사',nutritionist:'영양사',trainer:'운동 트레이너',counselor:'심리 상담사'};
const localHosts = new Set(['localhost','127.0.0.1','[::1]']);
const localAddresses = new Set(['127.0.0.1','::1','::ffff:127.0.0.1']);
export function createEmailMiddleware(env, fetchEmail = globalThis.fetch) {
  let attempts = [];
  return async function emailMiddleware(req, res, next) {
    if (req.url?.split('?')[0] !== '/api/email-chat') return next();
    const reply = (code, message, id) => {
      res.writeHead(code, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});
      res.end(JSON.stringify(id ? {id} : {message}));
    };
    if (req.method !== 'POST') {res.setHeader('Allow','POST'); return reply(405,'POST 요청만 지원합니다.');}
    try {
      const origin = new URL(req.headers.origin || '');
      const host = new URL(`http://${req.headers.host}`);
      if (!localHosts.has(origin.hostname) || origin.host !== host.host ||
          !['http:','https:'].includes(origin.protocol) || !localAddresses.has(req.socket.remoteAddress)) {
        return reply(403,'이 발송 서버는 현재 로컬 실행에서만 사용할 수 있어요.');
      }
    } catch {return reply(403,'올바른 페이지에서 다시 시도해 주세요.');}
    if (!env.RESEND_API_KEY || !env.CHAT_EMAIL_FROM) {
      return reply(503,'이메일 발송 설정이 아직 완료되지 않았어요. API 키와 발신 주소를 설정해 주세요.');
    }
    if (!req.headers['content-type']?.startsWith('application/json')) return reply(415,'JSON 요청이 필요합니다.');
    let bytes = 0, chunks = [];
    try {
      for await (const chunk of req) {
        bytes += chunk.length;
        if (bytes > 400000) {reply(413,'대화가 너무 길어요. PDF 저장을 이용해 주세요.');return;}
        chunks.push(chunk);
      }
      let data;
      try {data=JSON.parse(Buffer.concat(chunks).toString('utf8'));} catch {return reply(400,'잘못된 요청입니다.');}
      const {to, expert, text, requestId} = data || {};
      if (typeof to !== 'string' || to.length > 254 || !/^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/.test(to)) return reply(400,'이메일 주소를 확인해 주세요.');
      if (!Object.hasOwn(names,expert) || typeof text !== 'string' || !text.trim() || text.length>100000 ||
          typeof requestId !== 'string' || !/^[a-f0-9-]{36}$/.test(requestId)) return reply(400,'상담내용을 다시 확인해 주세요.');
      const now=Date.now(); attempts=attempts.filter(t=>now-t<600000);
      if (attempts.length>=10) return reply(429,'잠시 후 다시 시도해 주세요. 10분에 10회까지 전송할 수 있어요.');
      attempts.push(now);
      const response = await fetchEmail('https://api.resend.com/emails', {
        method:'POST', signal:AbortSignal.timeout(20000),
        headers:{'Authorization':`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`dmdap-chat/${requestId}`},
        body:JSON.stringify({from:env.CHAT_EMAIL_FROM,to:[to],subject:`[당문당답] ${names[expert]} 상담내용`,text})
      });
      const result=await response.json().catch(()=>null);
      if (!response.ok || typeof result?.id !== 'string') {
        if (response.status===403) return reply(502,'발신 도메인 또는 테스트 수신 주소 설정을 확인해 주세요.');
        if (response.status===401) return reply(502,'이메일 발송 API 키 설정을 확인해 주세요.');
        if (response.status===409) return reply(409,'전송 요청이 처리 중이에요. 잠시 후 같은 주소로 다시 눌러 주세요.');
        return reply(502,'발송 요청이 접수되지 않았어요. 잠시 후 다시 시도해 주세요.');
      }
      return reply(200,null,result.id);
    } catch {
      // Do not log the recipient, health conversation, or provider credentials.
      return reply(502,'전송 결과를 확인하지 못했어요. 같은 주소로 다시 전송해 주세요.');
    }
  };
}
export default function chatEmailPlugin(env) {
  return {name:'dmdap-chat-email',configureServer(server){server.middlewares.use(createEmailMiddleware(env));}};
}
