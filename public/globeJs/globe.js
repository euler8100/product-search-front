
async function loadGlobe(globTagSelector){
    const context={}
    const el= document.querySelector(".BackgroundGlobe")
    context.hasLoadingStarted=!0;
    const e=el.querySelector(globTagSelector);
    if(e){
        const{Globe:s}=await import("./Globe-0c73d045.js");
    context.isGlobeLoaded=!0,context.globe=new s(e);
    const t=el.dataset.jsCountryList;
    context.globe.load()
    context.globe.play()
    
}
}

window.loadGlobe = loadGlobe
if(window.globeTagSelector){
    window.loadGlobe(window.globeTagSelector)
}