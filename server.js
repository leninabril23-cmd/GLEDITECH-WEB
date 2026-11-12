import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'public');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon','.txt':'text/plain; charset=utf-8','.mp4':'video/mp4'};
const server=http.createServer(async(req,res)=>{
  if(req.url?.split('?')[0]==='/health'){res.writeHead(200,{'Content-Type':'application/json'});res.end('{"status":"ok"}');return;}
  try{
    const pathname=decodeURIComponent((req.url||'/').split('?')[0]);
    const target=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
    if(target!==root && !target.startsWith(root+path.sep)){res.writeHead(403);res.end('Forbidden');return;}
    let stat=await fs.stat(target); if(stat.isDirectory()){res.writeHead(404);res.end('Not found');return;}
    const mime=types[path.extname(target)]||'application/octet-stream';
    const headers={'Content-Type':mime,'X-Content-Type-Options':'nosniff','Cache-Control':pathname==='/'?'no-cache':'public, max-age=3600'};
    const range=req.headers.range;
    if(path.extname(target)==='.mp4' && range){
      const m=/^bytes=(\d*)-(\d*)$/.exec(range);
      if(!m){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});res.end();return;}
      let start=m[1]?Number(m[1]):Math.max(0,stat.size-Number(m[2]));
      let end=m[1]?(m[2]?Number(m[2]):stat.size-1):stat.size-1;
      if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start>=stat.size||end<start){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});res.end();return;}
      end=Math.min(end,stat.size-1);
      const body=await fs.readFile(target);
      res.writeHead(206,{...headers,'Accept-Ranges':'bytes','Content-Range':`bytes ${start}-${end}/${stat.size}`,'Content-Length':end-start+1});
      res.end(req.method==='HEAD'?undefined:body.subarray(start,end+1));return;
    }
    const body=await fs.readFile(target);
    res.writeHead(200,{...headers,'Content-Length':body.length,...(mime==='video/mp4'?{'Accept-Ranges':'bytes'}:{})});
    res.end(req.method==='HEAD'?undefined:body);
  }catch(e){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('No encontrado');}
});
const port=Number(process.env.PORT)||10000;
server.listen(port,'0.0.0.0',()=>console.log(`GLEDITECH web listening on ${port}`));
