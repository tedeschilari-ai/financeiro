/* Dashboard Financeiro · efeitos próprios, por cima do escola.js.
   Usado pela oficial (/comprar) e pelas versões de tráfego.
   Cada bloco só roda se o elemento existir na página. */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var brl=function(n){return 'R$ '+n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})};
  var conta=function(el,dur){var alvo=parseFloat(el.dataset.conta);if(reduce){el.textContent=brl(alvo);return}var t0=null;var f=function(t){if(!t0)t0=t;var p=Math.min((t-t0)/dur,1);p=1-Math.pow(1-p,3);el.textContent=brl(alvo*p);if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
  var quandoVer=function(el,fn,m){if(!el)return;if(!('IntersectionObserver' in window)){fn();return}var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){io.disconnect();fn()}})},{rootMargin:m||'0px 0px -15% 0px'});io.observe(el)};

  /* abertura: saldo subindo e meta enchendo */
  var palco=document.getElementById('palco');
  if(palco){
    setTimeout(function(){palco.querySelectorAll('[data-conta]').forEach(function(el){conta(el,1800)});palco.classList.add('go-meta')},700);
  }

  /* em segundos: cronômetro, números e destaque passando pelas 4 respostas */
  var painel=document.getElementById('painel'),tiles=document.getElementById('tiles'),perg=document.getElementById('perg');
  if(painel&&tiles&&perg){
    var ts=[].slice.call(tiles.children),ps=[].slice.call(perg.children),seg=document.getElementById('seg'),i=0,timer,dono=false;
    var foca=function(n){i=n;tiles.classList.add('foco');ts.forEach(function(t,j){t.classList.toggle('on',j===n)});ps.forEach(function(p,j){p.classList.toggle('on',j===n)})};
    var roda=function(){clearInterval(timer);timer=setInterval(function(){if(!dono)foca((i+1)%ts.length)},2400)};
    ps.forEach(function(p,j){p.addEventListener('mouseenter',function(){dono=true;foca(j)});p.addEventListener('mouseleave',function(){dono=false})});
    quandoVer(painel,function(){
      painel.classList.add('vivo');
      painel.querySelectorAll('[data-conta]').forEach(function(el){conta(el,1500)});
      if(seg){var s=0,c=setInterval(function(){s++;seg.textContent=s;if(s>=8)clearInterval(c)},reduce?0:220)}
      setTimeout(function(){foca(0);roda()},reduce?0:600);
    });
  }

  /* importação: lê o arquivo, as linhas entram e as categorias aparecem uma a uma; repete */
  var rev=document.getElementById('revisar');
  if(rev){
    var linhas=[].slice.call(rev.querySelectorAll('.linha'));
    var ciclo=function(){
      rev.classList.remove('play','fim');linhas.forEach(function(l){l.classList.remove('ok');l.style.transitionDelay=''});
      void rev.offsetWidth;
      setTimeout(function(){
        rev.classList.add('play');
        linhas.forEach(function(l,k){l.style.transitionDelay=(1.1+k*.18)+'s';setTimeout(function(){l.classList.add('ok')},1900+k*380)});
        setTimeout(function(){rev.classList.add('fim')},1900+linhas.length*380+300);
      },150);
    };
    if(reduce){rev.classList.add('play','fim');linhas.forEach(function(l){l.classList.add('ok')})}
    else quandoVer(rev,function(){ciclo();setInterval(ciclo,9000)});
  }

  /* pensamentos: os balões chegam um por um, com "digitando…" entre eles */
  var chat=document.getElementById('chat');
  if(chat){
    var bals=[].slice.call(chat.querySelectorAll('.bal')),dig=chat.querySelector('.digita');
    if(reduce){bals.forEach(function(b){b.classList.add('in')});if(dig)dig.style.display='none'}
    else quandoVer(chat,function(){
      bals.forEach(function(b,k){setTimeout(function(){b.classList.add('in');if(dig&&k===bals.length-1)setTimeout(function(){dig.style.display='none'},400)},300+k*1100)});
    });
  }

  /* recibo: os valores entram e o total é riscado */
  var rec=document.querySelector('.recibo');
  if(rec){quandoVer(rec,function(){rec.classList.add('in')})}
})();
