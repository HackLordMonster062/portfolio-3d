import { useParams } from 'react-router-dom';
import QuantumPotestScene from '@/scenes/QuantumPotestScene';
import GameDevScene from './scenes/GameDevScene';

export default function SceneManager() {
    const { sceneId } = useParams();

    return (
        <>
            {sceneId === 'quantum-potest' && <QuantumPotestScene />}
            {sceneId === 'game-dev' && <GameDevScene />}
        </>
    )
}