'use strict';

(function(){
  const TONE_MARKS = {
    'ā':['a',1],'á':['a',2],'ǎ':['a',3],'à':['a',4],
    'ē':['e',1],'é':['e',2],'ě':['e',3],'è':['e',4],
    'ī':['i',1],'í':['i',2],'ǐ':['i',3],'ì':['i',4],
    'ō':['o',1],'ó':['o',2],'ǒ':['o',3],'ò':['o',4],
    'ū':['u',1],'ú':['u',2],'ǔ':['u',3],'ù':['u',4],
    'ǖ':['ü',1],'ǘ':['ü',2],'ǚ':['ü',3],'ǜ':['ü',4],
    'ń':['n',2],'ň':['n',3],'ǹ':['n',4],
    'ḿ':['m',2]
  };
  const INITIALS=['zh','ch','sh','b','p','m','f','d','t','n','l','g','k','h','j','q','x','r','z','c','s','y','w'];
  const INITIAL_HINT={
    b:'gần “p/b” nhẹ, không bật hơi', p:'gần “ph/p” và bật hơi rõ', m:'như “m”', f:'gần “ph/f”',
    d:'gần “t” nhẹ, không bật hơi', t:'gần “th” và bật hơi', n:'như “n”', l:'như “l”',
    g:'gần “c/k” nhẹ, không bật hơi', k:'gần “kh/k” và bật hơi', h:'“h/kh” phát sâu hơn tiếng Việt',
    j:'gần “ch” rất mềm, đầu lưỡi thấp, không bật hơi', q:'gần “ch” mềm nhưng bật hơi mạnh', x:'gần “x/s” rất mềm, lưỡi đưa ra trước',
    zh:'gần “tr”, đầu lưỡi hơi cong lên', ch:'gần “tr/ch” bật hơi, đầu lưỡi cong', sh:'gần “s/sh”, đầu lưỡi cong', r:'gần “r/gi” nhưng lưỡi cong; không giống hẳn tiếng Việt',
    z:'gần cụm “dz/ts”, không bật hơi', c:'gần “ts” bật hơi', s:'gần “x/s”',
    y:'âm đệm “i/y”', w:'âm đệm “u/o”'
  };
  const FINAL_HINT={
    a:'“a”', o:'gần “ô/uo”', e:'giữa “ơ” và “ư”, thường gần “ơ” hơn; không đọc như e tiếng Việt',
    i:'“i”; sau z/c/s/zh/ch/sh/r là một âm đặc biệt, nghe gần “ư” rất ngắn', u:'“u”', ü:'“i/uy” nhưng giữ môi tròn như đang đọc u',
    ai:'“ai”', ei:'gần “ây/êi”', ao:'“ao”', ou:'gần “âu/ôu”',
    an:'“an”', en:'gần “ân/ơn” ngắn', ang:'“ang”', eng:'gần “âng/ơng”', ong:'gần “ung/ông”', er:'“ơ” kèm cuộn lưỡi',
    ia:'“ya/ia”', ie:'“iê”', iao:'“yao/iao”', iu:'gần “iêu” (viết tắt của iou)', ian:'gần “iên”', in:'“in”', iang:'“iang/yang”', ing:'“ing”', iong:'gần “yung”',
    ua:'“oa/ua”', uo:'gần “uô/uo”', uai:'“oai/uai”', ui:'gần “uây” (viết tắt của uei)', uan:'“oan/uan”', un:'gần “uân” (viết tắt của uen)', uang:'“oang/uang”', ueng:'gần “uâng”',
    üe:'gần “uyê” nhưng giữ môi tròn', üan:'gần “uyên” với môi tròn', ün:'gần “uyn” với môi tròn'
  };
  const INITIAL_SHORT={b:'p/b nhẹ',p:'ph bật hơi',m:'m',f:'ph/f',d:'t nhẹ',t:'th bật hơi',n:'n',l:'l',g:'c/k nhẹ',k:'kh bật hơi',h:'h/kh sâu',j:'ch mềm',q:'ch mềm bật hơi',x:'x/s mềm',zh:'tr cong lưỡi',ch:'tr/ch bật hơi',sh:'s/sh cong lưỡi',r:'r/gi cong lưỡi',z:'dz/ts',c:'ts bật hơi',s:'x/s',y:'i/y',w:'u/o'};
  const FINAL_SHORT={a:'a',o:'ô/uo',e:'ơ~ư (gần ơ)',i:'i',u:'u',ü:'i/uy môi tròn',ai:'ai',ei:'ây/êi',ao:'ao',ou:'âu/ôu',an:'an',en:'ân/ơn',ang:'ang',eng:'âng/ơng',ong:'ung/ông',er:'ơ cuộn lưỡi',ia:'ia/ya',ie:'iê',iao:'iao/yao',iu:'iêu',ian:'iên',in:'in',iang:'iang',ing:'ing',iong:'yung',ua:'oa/ua',uo:'uô/uo',uai:'oai',ui:'uây',uan:'oan/uan',un:'uân',uang:'oang',ueng:'uâng',üe:'uyê môi tròn',üan:'uyên môi tròn',ün:'uyn môi tròn'};
  const TONE_SHORT={0:'nhẹ',1:'T1 →',2:'T2 ↗',3:'T3 ↘↗',4:'T4 ↘'};
  const TONE_HINT={
    0:'thanh nhẹ: ngắn và nhẹ', 1:'T1: cao và ngang →', 2:'T2: đi lên ↗', 3:'T3: hạ thấp rồi nhấc lên ↘↗', 4:'T4: rơi nhanh, dứt khoát ↘'
  };

  function normalizeSyllable(raw){
    let tone=0; let base='';
    for(const ch of String(raw||'').toLowerCase()){
      if(TONE_MARKS[ch]){base+=TONE_MARKS[ch][0];tone=TONE_MARKS[ch][1];}
      else if(/[1-5]/.test(ch)){tone=ch==='5'?0:Number(ch);}
      else base+=ch;
    }
    base=base.replace(/u:/g,'ü').replace(/v/g,'ü').replace(/[^a-zü]/g,'');
    return {base,tone};
  }
  function splitSyllable(raw){
    const {base,tone}=normalizeSyllable(raw);
    let initial=INITIALS.find(x=>base.startsWith(x))||'';
    let final=base.slice(initial.length);
    // In standard Pinyin, ju/qu/xu/yu write the ü sound without dots.
    if(['j','q','x'].includes(initial) && final.startsWith('u')) final='ü'+final.slice(1);
    if(initial==='y'){
      if(final==='u') final='ü';
      else if(final.startsWith('ue')) final='üe'+final.slice(2);
      else if(final.startsWith('uan')) final='üan'+final.slice(3);
      else if(final.startsWith('un')) final='ün'+final.slice(2);
    }
    return {raw,base,tone,initial,final};
  }
  function syllableGuide(raw){
    const s=splitSyllable(raw);
    const parts=[];
    if(s.initial && INITIAL_HINT[s.initial]) parts.push(`${s.initial} ≈ ${INITIAL_HINT[s.initial]}`);
    if(s.final && FINAL_HINT[s.final]) parts.push(`${s.final} ≈ ${FINAL_HINT[s.final]}`);
    else if(s.final) parts.push(`${s.final}: nghe mẫu để bắt đúng khẩu hình`);
    parts.push(TONE_HINT[s.tone]||TONE_HINT[0]);
    return { ...s, parts, text:parts.join(' · ') };
  }
  function splitChunk(rawChunk){
    const chunks=[];
    const units=[];
    for(const ch of String(rawChunk||'')){
      const low=ch.toLowerCase();
      if(TONE_MARKS[low]) units.push({orig:ch,base:TONE_MARKS[low][0],marked:true});
      else if(/[a-zü]/i.test(ch)) units.push({orig:ch,base:low,marked:false});
      else if(/[1-5]/.test(ch) && units.length){ units[units.length-1].orig+=ch; units[units.length-1].marked=true; }
    }
    if(!units.length)return chunks;
    const vowel=x=>Boolean(x)&&'aeiouü'.includes(x);
    let start=0, seenVowel=false, toneSeen=false;
    const push=end=>{if(end>start)chunks.push(units.slice(start,end).map(x=>x.orig).join(''));start=end;seenVowel=false;toneSeen=false;};
    for(let i=0;i<units.length;i++){
      const c=units[i].base, next=units[i+1]?.base||'';
      let boundary=false;
      if(i>start && seenVowel){
        if(vowel(c) && units[i].marked && toneSeen) boundary=true;
        else if('bpmfdtlkhjqxzcsyw'.includes(c)) boundary=true;
        else if(c==='r') boundary=vowel(next);
        else if(c==='n'||c==='g') boundary=vowel(next);
      }
      if(boundary) push(i);
      if(vowel(c))seenVowel=true; if(units[i].marked)toneSeen=true;
    }
    push(units.length);
    return chunks;
  }
  function tokenize(pinyin){
    const rough=String(pinyin||'').trim().split(/[\s·/'’]+/).filter(Boolean);
    return rough.flatMap(splitChunk);
  }
  function compactGuide(pinyin){
    return tokenize(pinyin).map(raw=>{
      const g=syllableGuide(raw);
      const mini=[];
      if(g.initial && INITIAL_SHORT[g.initial]) mini.push(`${g.initial}≈${INITIAL_SHORT[g.initial]}`);
      if(g.final && FINAL_SHORT[g.final]) mini.push(`${g.final}≈${FINAL_SHORT[g.final]}`);
      mini.push(TONE_SHORT[g.tone]||TONE_SHORT[0]);
      return `${raw}: ${mini.join(' · ')}`;
    }).join('  |  ');
  }
  function guideRows(pinyin){return tokenize(pinyin).map(syllableGuide);}

  window.TOCFLPinyin={normalizeSyllable,splitSyllable,syllableGuide,compactGuide,guideRows,INITIAL_HINT,FINAL_HINT,TONE_HINT};
})();
