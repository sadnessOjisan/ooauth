import Fastify from "fastify";
import fs from "fs";
import path from "path";

const fastify = Fastify({
  logger: false,
});

/**
 * 認可エンドポイント
 * 認可画面を生成してユーザーに返す
 * 認可コードを前提: https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1
 * 認証機能が埋め込まれた画面を返す
 * req
 *   - response_type: 今はcode（認可コードだけをsupport
 *   - client_id
 *   - redirect_url
 *   - scope: 今はall
 *
 */
fastify.get("/grant", (request, reply) => {
  const url = path.join(process.cwd(), "./src/template/auth.html");
  fs.readFile(url, (err, data) => {
    reply.type("text/html");
    reply.send(data);
  });
});

/**
 * 認可決定エンドポイント
 * 認証できたら認可コードを生成する
 * リダイレクト先のURLはクライアントアプリのURL、get query に 認可コードを含めているので、クライアント側のサーバーがその値を取れる
 *
 * res
 *   - status: 302
 *   - ?code=認可コード
 */
fastify.get("/auth", (request, reply) => {
  reply.send("need redirect");
});

/**
 * トークンエンドポイント
 * クライアントが認可コードを使ってアクセスしてくる
 * req:
 *   - grant_type: "authorization code"
 *   - code: 認可コード
 *   - client_id:
 *   - redirect_url
 *
 * res:
 *   - access_token
 *   - token_type
 *   - expires_in
 *   - scope
 *   - refresh_token
 */
fastify.post("/token", (request, reply) => {
  reply.send("need token");
});

// Run the server!
fastify.listen(3000, (err, address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});
