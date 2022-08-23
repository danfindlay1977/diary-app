import {useState, useEffect} from 'react' // rafce

const Controls =  (props) => {
    return (
        <section className="stories-controls">
            <section>
            <label for="words">Word Limit</label>
            <input onChange={props.onChangeHandler} type="range" step="1" value={props.wordLimit} name="words" min="0" max="500" />
            <label>{props.wordLimit}</label>
            </section>
            <section>
                <label>Sort</label>
                <select value={props.filterOrder} onChange={props.onSortChangeHandler}>
                    <option>Ascending</option>
                    <option>Descending</option>
                </select>
            </section>
        </section>
    )
}

export default Controls
