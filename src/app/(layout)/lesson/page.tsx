import Player from '@/components/player'
import st from './st.module.sass'

const page = () => {
    return (
        <>
            <div className={st.wrapper}>
                <div className={st.column}>
                    <div className={`${st.cont} ${st.video__container}`}>
                        <div className={st.player}>
                            <Player src={'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'} points={[
                                {label: 'Начало', time: 6}
                            ]}/>
                        </div>
                        <h1>Теория</h1>
                    </div>
                    <div className={st.bottom}>
                        <div className={`${st.cont} ${st.description}`}>
                            <h2>Описание</h2>
                        </div>
                        <div className={`${st.cont} ${st.timecodes}`}>
                            <h2>Таймкоды</h2>
                        </div>
                    </div>
                </div>
                <div className={st.column}>
                    <div className={`${st.cont} ${st.materials}`}><h2>Материалы к уроку</h2></div>
                    <div className={`${st.cont} ${st.practice}`}><h2>Практика</h2></div>
                    <div className={`${st.cont} ${st.today}`}><h2>Твои занятия на сегодня</h2></div>
                </div>
            </div>
        </>
    )
}

export default page