import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/auth-content";
import { createUser } from "../components/util/auth";
import LoadingOverlay from "../components/UI/loading-overlay";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password, firstName, lastName }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password, firstName, lastName);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user. Please check your input please!"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating User..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;