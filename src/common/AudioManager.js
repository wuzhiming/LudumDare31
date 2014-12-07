/**
 * Created by wzm on 14-8-24.
 */
var AudioManager = cc.Class.extend({
    ctor:function(){
        this.audio = cc.audioEngine;
    },
    playMusic:function(str,loop){
        if(!this.getMusicStatus()) return;
        this.audio.playMusic(str,loop);
    },
    stopMusic:function(){
        if(!this.getMusicStatus() && !this.audio.isMusicPlaying()) return;
        this.audio.stopMusic();
    },
    pauseMusic:function(){
        if(!this.getMusicStatus() && !this.audio.isMusicPlaying()) return;
        this.audio.pauseMusic();
    },
    playEffect:function(str,loop){
        if(!this.getEffectStatus()) return;
        return this.audio.playEffect(str,loop);
    },
    pauseEffect:function(str){
        if(!this.getEffectStatus()) return;
        this.audio.pauseEffect(str);
    },
    stopEffect:function(soundid){
        if(!this.getEffectStatus()) return;
        this.audio.stopEffect(soundid);
    },
    getMusicStatus:function(){
        return true;
    },
    getEffectStatus:function(){
        return true;
    }

});
AudioManager._instance = null;
AudioManager.getInstance = function(){
    if(!AudioManager._instance){
        AudioManager._instance = new AudioManager();
    }
    return AudioManager._instance;
}
audioManager = AudioManager.getInstance();