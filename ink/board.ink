= board
NO_TEXT #board

+ [BACK]
->room
+ [Yes]
"YES". #all
{currentQuestion == 1:
->there_are_ghosts_here
}

+ [No]
"NO". #all
{currentQuestion == 1:
->no_ghosts_here
}

That... doesn't make any sense at all in this context. #amelia

- ->board

= no_ghosts_here
{no_ghosts_here > 1:
Stop doing that! #zoey
I told you, it's not me! #amelia
But why would a ghost tell us it's not here? #zoey
Maybe it's not a ghost? Maybe it's... an invisible alien telepath? #natalie
... #zoey
... #amelia
... nevermind. Let's try it again.
Are there any ghosts with us now that want to speak to us? #zoey
->board

}

Phew. #natalie
What do you mean, "phew"? #zoey
Well, I mean, if there aren't any spirits here... #natalie
Clearly, Amelia was pushing the planchette. #zoey
Me? No, I wasn't! #amelia
You're the one who said there weren't any ghosts here, so clearly you tried to get the board to say the same thing! #zoey
But... If I wanted you to believe there weren't any ghosts here, I wouldn't... #amelia
... nevermind. Let's try it again.
Are there any ghosts with us now that want to speak to us? #zoey
->board

= there_are_ghosts_here
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
Huh. I feel... different. I'm... stronger? #me
Did that happen because I answered their question?
~ currentQuestion = 2
Do you want to ask the next question, Natalie? #zoey
Me? *Gulp!* #natalie
->are_you_friendly


= are_you_friendly
Uhm... Spirit? Are you friendly? #natalie
{are_you_friendly < 2:
I... can't remember, but I assume I am? #me
}
->board

= spirit_is_evil
\*AAAAH!* It is evil! #Natalie
