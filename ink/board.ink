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
{currentQuestion == 2:
->spirit_is_evil
}
- That... doesn't make any sense at all in this context. #amelia
Maybe we should try asking again? #natalie
Okay. Spirit...
->board

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
Uhm... Spirit? Are you friendly? #natalie  #Q:Are you friendly?
{are_you_friendly < 2:
Am I "friendly"? I can't even remember my name! #me
I should probably just say yes or no here. I... *assume* I'm friendly? #me
}
->board

= spirit_is_evil
\*AAAAH!* It is evil! We summoned an evil ghost! #natalie
Relax. We talked about this, remember? When we come across an evil spirit, we just say goodbye to it, and it will go away. #zoey
We have no interest in talking to you, spirit. Good bye! #zoey
... #amelia
... is it gone? #natalie
I think so. #zoey
... okay. So that's what happens if you tell someone you're evil. #me
I probably shouldn't do that again.
I'm still here, though, so clearly that "good bye" thing does not work.
But I didn't get that tingly feeling I got last time, either. Maybe I need to... give them answers that satisfy them or something?
Are there any other spirits here?
->board