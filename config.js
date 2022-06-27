module.exports = {
        px: '!',
        playing: '音楽',

    opt: {
        DJ: {
            enabled: false, //DJだけに使用させたい場合は、FALSEをTRUEに設定します。
            roleName: 'DJ', //DJロールの名前を書いてください。あなたのサーバー上で使用することができます。
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'skip', 'stop', 'volume'] //Please don't touch
        },
        maxVol: 250, //最大ボリュームのレベルを指定できます。
        loopMessage: false, //Please don't touch
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio', //Please don't touch
                highWaterMark: 1 << 25 //Please don't touch
            }
        }
    }
};

