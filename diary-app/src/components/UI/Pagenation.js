import React from 'react'

 const Pagenation = ({page, pages, onChangeHandler}) => {
     let middlePagenation;
     if(pages <= 5) {
         console.log("in if ")
         middlePagenation = [...Array(5).map((_, idx) => 
            <button
            key={idx+1}
            className="mid-pagenation-btn"
           // onClick={() => onChangeHandler(idx+1)}
            >
                {idx+1}
            </button>
            )]
     }
     else{
        const startValue = Math.floor((page - 1) / 5) * 5;
        middlePagenation = (
            <>
            {[...Array(5).map((_, idx) => 
                <button 
                key={startValue+idx+1}
                className="mid-pagnation-btn"
               // onClick={() => onChangeHandler(startValue+idx+1)}
                >
                    {startValue + idx + 1}
                </button>
                )]}
                <button>...</button>
              <button>{pages}</button>
            </>
        )
        
     }
     console.log(middlePagenation + "is here")
    return pages && (
            <section className="stories-pageCount">
                <button className="btn prev-btn">prev</button>
                {middlePagenation}
                <button className="btn next-btn">next</button>
            </section>
   
    )
}
export default Pagenation