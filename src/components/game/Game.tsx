import { Story } from 'inkjs';
import json from '../../ink/story.json'
import { useEffect, useState } from 'react';
import { TextObject } from '../../types/gameTypes';

const formatLine = (line : string) => {

	const lineParts = line.split('*');
	if (lineParts.length < 2) {
		return line;
	}
	return lineParts.map((el, index) => index % 2 === 1 ? <em key={index}>{el}</em> : el)
}

const characterSprite = {
	natalie: {
		DEFAULT: 'natalie-nervous.png',
		nervous: 'natalie-nervous.png',
		
	}
} as {
	[key : string]: {
		[key : string] : string,
	}
};

const Game = () => {

	const [story, setStory] = useState<undefined | InstanceType<typeof Story>>(undefined);
	const [currentLine, setCurrentLine] = useState(null as null|TextObject);
	const [score, setScore] = useState(0);

	useEffect(() => {
		// Initialize story on load
		const ink = new Story(json);

		// TODO: If an autosave exists, load it here

		setStory(ink);
	}, []);

	const progress = () => {
		if (!story) {
			return;
		}
		if (story.canContinue) {
			let text = story.Continue() || '';

			if (text.trim() === 'NO_TEXT') {
				text = '';
			}

			const tags = currentLine?.tags ? { ...currentLine.tags } : {};
			story.currentTags?.forEach((tag) => {
				const splitTag = tag.split(':');
				if (splitTag.length > 1) {
					tags[splitTag[0]] = splitTag[1];
				}
				else {
					switch (tag) {
						case "me":
							tags.character = 'me';
							tags.speakerName = '';
							tags.lineStyle = 'narrative';
							break;
						case "zoey":
							tags.character = 'zoey';
							tags.speakerName = 'Zoey';
							tags.lineStyle = 'dialog';
							break;
						case "amelia":
							tags.character = 'amelia';
							tags.speakerName = 'Amelia';
							tags.lineStyle = 'dialog';
							break;
						case "natalie":
							tags.character = 'natalie';
							tags.speakerName = 'Natalie';
							tags.lineStyle = 'dialog';
							break;
						case "hailey":
							tags.character = 'hailey';
							tags.speakerName = 'Hailey';
							tags.lineStyle = 'dialog';
							break;
						case "mia":
							tags.character = 'mia';
							tags.speakerName = 'Mia';
							tags.lineStyle = 'dialog';
							break;
						case "chanting":
							tags.character = 'chanting';
							tags.speakerName = '';
							tags.lineStyle = 'dialog';
							break;
						case "all":
							tags.character = 'chanting';
							tags.speakerName = '';
							tags.lineStyle = 'dialog';
							break;
						case "anonymous":
							tags.speakerName = '???';
							break;
						case "board":
							tags.room = 'board';
							tags.menuStyle = 'board';
							break;
						case "room":
							tags.room = 'room';
							tags.menuStyle = 'room';
							break;
						case "updateScore":
							setScore(story.variablesState["score"]);
							console.log(story.variablesState["score"]);
							break;

					}
				}
			});

			if (tags.character && characterSprite[tags.character]) {
				if (tags.mood && characterSprite[tags.character][tags.mood]) {
					tags.sprite = characterSprite[tags.character][tags.mood];
				}
				else {
					tags.sprite = characterSprite[tags.character].DEFAULT || '';
				}
			}
			else if (tags.character !== 'me') {
				tags.sprite = '';
			}

			setCurrentLine({ text: text, tags: tags, choices: story.currentChoices ? story.currentChoices.map(el => el.text) : undefined});
		}
	}

	const selectChoice = (choice : number) => {
		story?.ChooseChoiceIndex(choice);
		progress();
	}

	return (
		<div className={`game${currentLine?.tags.layout ? ' layout-' + currentLine.tags.layout : ''}`} data-score={score}>
			{currentLine ?
			<>
			{currentLine.tags.image ? 
				<img 
					className="splash-image"
					src={`./images/${currentLine.tags.image}`} />
			: null}
			{currentLine.tags.character && currentLine.tags.sprite ? 
				<div className="portrait">
					<img src={`./characters/${currentLine.tags.sprite}`} alt="" style={ {filter: ""} } />
				</div>
			: null}
			{currentLine.text ? 
				<div className={`line ${currentLine.tags.lineStyle || ''}${currentLine.tags.character ? ' character-' + currentLine.tags.character	 : ''}`}>
					{currentLine.tags.speakerName ?
						<div className="speaker">{currentLine.tags.speakerName}</div>
					: null}
					<div className="text">{formatLine(currentLine.text)}</div>
				</div>
			: null}
			{currentLine.choices && currentLine.choices.length ? 
				<div className="choices-wrapper">
				<div className={`choices ${currentLine.tags.menuStyle || ''}`}>
					{currentLine.choices.map((el, index) => <button key={index} data-index={index} onClick={() => selectChoice(index)}>{el}</button>)}
				</div>
				</div>
			: null}
			</>
			: <div className="no-story-yet"><p>Press <kbd>Space</kbd> or <kbd>Enter</kbd> or click/tap anywhere to start the game.</p></div>}
			{
			story?.canContinue ?
			<button className="progress-button" onClick={progress}></button>
			: null
			}
			{
			<div className={`progress ${score ? '' : 'invisible'}`}>
				<div className="target" style={{width: `${Math.ceil(score / 3.0) * 3 / 9 * 100}%`}}></div>
				<div className="score" style={{width: `${score / 9 * 100}%`}}></div>
			</div>
			}
		</div>
	)
}

export default Game;