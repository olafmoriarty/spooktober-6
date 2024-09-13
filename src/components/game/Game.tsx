import { Story } from 'inkjs';
import json from '../../ink/story.json'
import { useEffect, useState } from 'react';
import { TextObject } from '../../types/gameTypes';

const formatLine = (line : string) => {

	const lineParts = line.split('*');
	if (lineParts.length < 2) {
		return line;
	}
	return lineParts.map((el, index) => index % 2 === 1 ? <em>{el}</em> : el)
}

const Game = () => {

	const [story, setStory] = useState<undefined | InstanceType<typeof Story>>(undefined);

	const [currentLine, setCurrentLine] = useState(null as null|TextObject);

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
					}
				}
			});

			console.log(story.currentChoices.map(el => el.text));
			console.log(tags)

			setCurrentLine({ text: text, tags: tags, choices: story.currentChoices ? story.currentChoices.map(el => el.text) : undefined});
		}
	}

	const selectChoice = (choice : number) => {
		story?.ChooseChoiceIndex(choice);
		progress();
	}

	return (
		<div className={`game${currentLine?.tags.layout ? ' layout-' + currentLine.tags.layout : ''}`}>
			{currentLine ?
			<>
			{currentLine.tags.image ? 
				<img 
					className="splash-image"
					src={`./images/${currentLine.tags.image}`} />
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
				<div className="choices">
					{currentLine.choices.map((el, index) => <button key={index} onClick={() => selectChoice(index)}>{el}</button>)}
				</div>
			: null}
			</>
			: <div className="no-story-yet">Press any key or click/tap anywhere to start the game.</div>}
			{
			story?.canContinue ?
			<button className="progress-button" onClick={progress}></button>
			: null
			}
		</div>
	)
}

export default Game;