//compress js version 3.0

const loader=document.getElementById("loader");document.getElementById("ai").addEventListener("change",toggleAi),document.getElementById("fps").addEventListener("input",changeFps);const video=document.getElementById("video"),c1=document.getElementById("c1"),ctx1=c1.getContext("2d");var cameraAvailable=!1,aiEnabled=!1,fps=30,facingMode="environment",constraints={audio:!1,video:{facingMode:facingMode}};function camera(){loader.style.display="block",cameraAvailable||(console.log("camera"),navigator.mediaDevices.getUserMedia(constraints).then(function(e){cameraAvailable=!0,video.srcObject=e,loader.style.display="none"}).catch(function(e){cameraAvailable=!1,modelIsLoaded&&"NotAllowedError"===e.name&&(document.getElementById("loadingText").innerText="Waiting for camera permission"),setTimeout(camera,1e3)}))}function timerCallback(){isReady()&&(setResolution(),ctx1.drawImage(video,0,0,c1.width,c1.height),aiEnabled&&ai()),setTimeout(timerCallback,fps)}function isReady(){return!!modelIsLoaded&&!!cameraAvailable&&(document.getElementById("loadingText").style.display="none",document.getElementById("ai").disabled=!1,!0)}function setResolution(){if(window.screen.width<video.videoWidth){c1.width=.9*window.screen.width;let e=c1.width/video.videoWidth;c1.height=video.videoHeight*e}else if(window.screen.height<video.videoHeight){c1.height=.5*window.screen.height;let t=c1.height/video.videoHeight;c1.width=video.videoWidth*t}else c1.width=video.videoWidth,c1.height=video.videoHeight}function toggleAi(){aiEnabled=document.getElementById("ai").checked}function changeFps(){fps=1e3/document.getElementById("fps").value}camera(),window.onload=function(){timerCallback()};const labelCorrections={person:"men"};let spokenObjects={},detectedObjects=[];function ai(){objectDetector.detect(c1,(t,i)=>{for(let a=0;a<i.length;a++){let d=i[a];ctx1.font="15px Arial",ctx1.fillStyle="red";let c=labelCorrections[d.label]||d.label;ctx1.fillText(c+" - "+(100*d.confidence).toFixed(2)+"%",d.x+10,d.y+15),ctx1.beginPath(),ctx1.strokeStyle="red",ctx1.rect(d.x,d.y,d.width,d.height),ctx1.stroke(),spokenObjects[c]||(responsiveVoice.speak(c,"UK English Male"),spokenObjects[c]=!0,e(c))}});function e(e){let t=document.createElement("div");t.innerHTML=`
                    <div class="preview-item border-bottom">
                        <div class="preview-thumbnail">
                          <img src="template/assets/images/faces/face9.jpg" alt="image" class="rounded-circle" />
                        </div>
						
                        <div class="preview-item-content d-flex flex-grow" id="objectList">
                          <div class="flex-grow">
                            <div class="d-flex d-md-block d-xl-flex justify-content-between">
                              <h6 class="preview-subject"> ${e}</h6>
                              <p class="text-muted text-small"> Few Seconds Ago </p>
                            </div>
                            <p class="text-muted"> Object Detected  </p>
                          </div>
                        </div>
                      </div>
                `,document.getElementById("objectList").appendChild(t)}}