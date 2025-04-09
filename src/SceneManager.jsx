import { useParams } from 'react-router-dom';
import QuantumPotestScene from '@/scenes/QuantumPotestScene';

export default function SceneManager() {
    const { sceneId } = useParams();

    return (
        <>
            {sceneId === 'quantum-potest' && <QuantumPotestScene />}
        </>
    )
}