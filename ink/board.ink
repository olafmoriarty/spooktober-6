= board
NO_TEXT #board

+ [BACK]
->room
+ [Yes]
"YES". #all
{currentQuestion == 1:
\*Gulp!* A ghost! A ghost! #natalie
See? I told you there were spirits here! #zoey
Wow. How convincing and not at all easy to fake. #amelia
Are you being sarcastic? #zoey
How did you guess? #amelia
\*I* didn't push the planchette. #zoey
Sure. I believe you. #amelia
Stop bickering! The ghost is trying to talk to us! #natalie
~ score = score + 1
Fine. I'll play along. Talk to the "ghost", then. #amelia
Thank you. #zoey #updateScore
Huh. I feel... different. #me

~ currentQuestion = 2
->board
}

+ [No]
"NO". #all
{currentQuestion == 1:
Phew. #natalie
What do you mean, "phew"? #zoey
Well, I mean, if there aren't any spirits here... #natalie
Clearly, Amelia was pushing the planchette. #zoey
Me? No, I wasn't! #amelia
You're the one who said there weren't any ghosts here, so clearly you tried to get the board to say the same thing! #zoey
But... If I wanted you to believe there weren't any ghosts here, I wouldn't... #amelia
... nevermind. Let's try it again.
}

- ->board