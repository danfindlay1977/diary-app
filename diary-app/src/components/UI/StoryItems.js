import React from 'react'

const StoryItems = (props) => {
   let entry;
   switch(props.classes) {
       case 'stories-entry1':
       case  'sotires-entry2':
                entry = props.entry.split(" ").slice(0,20).join(" ")
                break;
        case "stories-entry-small1":
        case "stories-entry-small2":
            entry = props.entry.split(" ").slice(0,10).join(" ")
            break;

       default:
            entry = props.entry
   }
    return (
        <section className={props.classes}>
            
            <h3>{props.title}</h3>
            <h3>{props.topic}</h3>
            <p>{entry}</p>
        </section>
    )
}

export default StoryItems
