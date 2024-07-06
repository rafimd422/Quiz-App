import React from "react"

const IntroCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => (
  <div
    className={
      "rounded-xl border bg-card text-card-foreground shadow min-w-[300px]"}>

<div className={"flex flex-col space-y-1.5 sm:p-6 p-5"}>
        <h3
    className={"font-semibold leading-none tracking-tight"}>
        Welcome to QuizMaster!
    </h3>
    <p
    className={"text-sm text-muted-foreground"}>
        QuizMaster is a platform for creating and taking quizzes. Get started by logging in below!
    </p>
        </div>
        <div className={" flex items-center p-6 pt-0"}>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium text-rose-50 focus-visible:ring-1 focus-visible:ring-ring
        bg-gray-900 shadow hover:bg-gray-800 h-9 px-4 py-2">Sign In with Google</button>
        </div>
      </div>
))


export default IntroCard;