import { FC } from "react";
import GoogleLogin from "./GoogleLogin";

const WelcomeCard: FC = () => {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow min-w-[300px]">
      <div className="flex flex-col space-y-1.5 sm:p-6 p-5">
        <h3 className="font-semibold leading-none tracking-tight">
          Welcome to QuizMaster!
        </h3>
        <p className="text-sm text-muted-foreground">
          QuizMaster is a platform for creating and taking quizzes. Get started
          by logging in below!
        </p>
      </div>
      <div className="flex items-center p-6 pt-0">
        <GoogleLogin />
      </div>
    </div>
  );
};

export default WelcomeCard;
