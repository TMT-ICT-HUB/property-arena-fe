import { ProtectedButton } from "@/components/ProtectedButton";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import React from "react";

const HomePage: React.FC = () => {
  const requireAuth = useRequireAuth();

  const handleSecretThing = () => {
    // protected action
    console.log('You unlocked the secret!');
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome Home!</h1>
      <p>This is the protected home page.</p>

      <button
        onClick={() =>
          requireAuth(handleSecretThing)
        }
        className="px-4 py-2 bg-primary-red text-white rounded"
      >
        Do Something Secret
      </button>
      <ProtectedButton
        onAuthClick={handleSecretThing}
        className="px-4 py-2 bg-primary-red text-white rounded"
      >
        Do Something Secret
      </ProtectedButton>
    </div>
  );
};

export default HomePage;
