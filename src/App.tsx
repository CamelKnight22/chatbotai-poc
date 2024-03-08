import { PresentationControls, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import ChatBox from "./components/chatbox";
import { Model } from "./components/Model";

function App() {
  const [animation, setAnimation] = useState("Idle");
  const [canvasKey, setCanvasKey] = useState(0);
  const setIdleAgain = () => {
    setAnimation("Idle");
    setCanvasKey((prevKey) => prevKey + 1);
  };
  const handleMessageSend = () => {
    setAnimation("talking");
    setCanvasKey((prevKey) => prevKey + 1);

    // Optionally reset to "Idle" after a delay if the Model doesn't handle it
    setTimeout(() => setIdleAgain(), 4000); // Reset after 3 seconds
  };

  return (
    <div className="bg-gradient-to-r from-neutral-300 to-cyan-50 w-screen h-screen flex flex-col">
      <div className="flex-grow-0 flex-shrink-0 h-2/3">
        <Canvas
          key={canvasKey}
          className="w-full h-full touch-none"
          shadows
          dpr={[1, 2]}
          camera={{ fov: 50, position: [0, 0.5, 2] }}
        >
          <Suspense fallback={null}>
            <PresentationControls
              config={{ mass: 2, tension: 200 }}
              snap
              global
              polar={[-Math.PI / 5, Math.PI / 5]}
              azimuth={[-Math.PI / 2, Math.PI / 2]}
            >
              <ambientLight intensity={1} />
              <Environment preset="city" />

              <Model
                scale={1.6}
                position={[-0.1, -1.9, 0]}
                animation={animation}
              />
            </PresentationControls>
          </Suspense>
        </Canvas>
      </div>

      <div className="flex-grow flex-shrink h-1/3">
        <ChatBox onSendMessage={handleMessageSend} />
      </div>
    </div>
  );
}

export default App;
