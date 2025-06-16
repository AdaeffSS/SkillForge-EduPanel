'use client';

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import 'plyr/dist/plyr.css';
import st from './st.module.sass';
import {MarkersPoints} from "plyr";

interface PlyrPlayerProps {
    src: string;
    poster?: string;
    className?: string;
    points?: MarkersPoints[]
}

const PlyrPlayer: React.FC<PlyrPlayerProps> = ({ src, points, poster, className = '' }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<any>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        let hls: Hls | null = null;

        const setup = async () => {
            const Plyr = (await import('plyr')).default;
            const video = videoRef.current;
            if (!video) return;

            playerRef.current = new Plyr(video, {
                keyboard: {
                    focused: true,
                    global: true
                },
                controls: [
                    'play-large',
                    'play',
                    'progress',
                    'current-time',
                    'duration',
                    'mute',
                    'settings',
                    'volume',
                    'pip',
                    'airplay',
                    'fullscreen',
                ],
                markers: {
                    enabled: !!points,
                    points: points || [{time: -1, label: ''}]
                },
                settings: ['speed'],
                i18n: {
                    restart: 'Заново',
                    play: 'Включить',
                    pause: 'Пауза',
                    currentTime: 'Текущее время',
                    duration: 'Продолжительность',
                    volume: 'Громкость',
                    mute: 'Выключить звук',
                    unmute: 'Включить звук',
                    enableCaptions: 'Включить субтитры',
                    disableCaptions: 'Отключить субтитры',
                    enterFullscreen: 'Полноэкранный режим',
                    exitFullscreen: 'Выйти из полноэкранного режима',
                    frameTitle: 'Плеер {title}',
                    captions: 'Субтитры',
                    settings: 'Настройки',
                    speed: 'Скорость',
                    normal: '1×',
                    quality: 'Качество',
                    loop: 'Повтор',
                    start: 'Начало',
                    end: 'Конец',
                    all: 'Все',
                    reset: 'Сброс',
                    disabled: 'Отключено',
                    advertisement: 'Реклама',
                },
                autoplay: false,
            });

            if (Hls.isSupported() && src.endsWith('.m3u8')) {
                hls = new Hls();
                hls.loadSource(src);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    setIsReady(true);
                });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = src;
                video.addEventListener('loadedmetadata', () => {
                    setIsReady(true);
                });
            } else {
                setIsReady(true);
            }
        };

        setup().then(() => {});

        return () => {
            playerRef.current?.destroy();
            hls?.destroy();
            setIsReady(false);
        };
    }, [src]);

    return (
        <div className={`${st.wrapper} ${isReady ? st.active : ''} ${className}`}>
            <video
                ref={videoRef}
                className="plyr-react plyr"
                data-poster={poster}
                preload="none"
            />
        </div>
    );
};

export default PlyrPlayer;
