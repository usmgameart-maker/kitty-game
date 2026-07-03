export default class Boot extends Phaser.Scene
{
    constructor()
    {
        super('Boot');
    }

    preload()
    {
        // загружаем лого ДО Preloader — чтобы показать его на экране загрузки
        this.load.image('logo_load', 'assets/images/logo_load.png');
    }

    create()
    {
        console.log('BOOT');

        // =========================
        // ЗАГРУЗКА СОХРАНЕНИЯ ИЗ localStorage
        // =========================
        const saved = localStorage.getItem('gameProgress');
        if (saved)
        {
            try
            {
                window.gameProgress = JSON.parse(saved);
                // обратная совместимость: добавляем поля если их нет в старом сохранении
                window.gameProgress.missionCompleted = window.gameProgress.missionCompleted ?? false;
            }
            catch (e)
            {
                window.gameProgress = { score: 0, completed: {}, missionCompleted: false };
            }
        }
        else
        {
            window.gameProgress = { score: 0, completed: {}, missionCompleted: false };
        }

        // =========================
        // ФИКС ШРИФТА (ВАЖНО)
        // =========================
        Promise.all([
            document.fonts.load('16px VCR'),
            document.fonts.load('16px Chava'),
            document.fonts.load('16px HV')
        ]).then(() => {

            console.log('Fonts loaded');

            this.scene.start('Preloader');
        });
    }
}