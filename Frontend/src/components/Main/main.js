import React, { useEffect, useState } from "react"
import "./main.css"
const MainPage = (props) => {
  const [arr, setarr] = useState([])
  const [hover, sethover] = useState(false)
  const [searching, setsearch] = useState("")
  const [display, setdisplay] = useState(false)
  const [list,setlist]=useState([])
  const [label, setlabel] = useState("")
  const [url, seturl] = useState("")

  // -----------------------------  FETCHING ALL IMAGES  ----------------------------------------

  let fun = async () => {
    let dd = await fetch("https://gallery-6kjc.onrender.com/photos").then((res) => {
      return res.json()
    }).then((dataa) => {

      setarr(dataa.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    fun()
  }, [])

  
  let arr2 = []
  if (arr.length !== 0 && searching.length !== 0) {
    for (let i = 0; i < arr.length; i++) {
      let letter = arr[i].label
      let flag = "true"
      for (let j = 0; j < searching.length; j++) {
        if (searching[j] !== letter[j]) {
          flag = "false"
          break
        }
      }
      if (flag === "true") {
        arr2.push(arr[i])
      }
    }

  } else {
    arr2 = arr
  }

  const handle = (e) => {
    sethover(true)
       console.log(e.label)
       let newarr=[]
       for(let i=0;i<arr2.length;i++){
        if(arr2[i]._id==e._id){
          newarr.push(arr2[i]._id)
        }
       }

       setlist(newarr)
  }

  const handle2 = () => {
    sethover(false)
  }

    // ---------------------------  DELETING IMAGE  -------------------------------------

  const handleDelete = (e) => {
    fetch(`https://gallery-6kjc.onrender.com/delete/:${e._id}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
  }).then((response) => response.json())
      .then((prevdata) => {
          console.log(prevdata);
         
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }

  const handleDis = () => {
    setdisplay(true)
  }
  const removeForm = () => {
    setdisplay(false)
  }

  // --------------------------------  POSTING IMAGES  ------------------------------------------

  const formsubmit = () => {
    setdisplay(false)
    fetch("https://gallery-6kjc.onrender.com/photos", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        label: label,
        url: url

      })
    })

  }
  return (
    <>
      <div id="header">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCmbHobq48iddFh4kU4WC26O7xyj-8wl9fcsPrmxmdeg&usqp=CAU&ec=48665701" alt="header" id="top-img" />
        <input type="text" id="text" placeholder="Search by name" onInput={(e) => { setsearch(e.target.value) }} />
        <button id="post" onClick={handleDis} > Add a photo </button>
      </div>

      {arr2.length !== 0 && arr2.map((value, key) => {

        return (
          <div id="cart" key={key}>
            <img src={value.url} alt="aa" width="260px" height="300px" onMouseOver={(e) => { handle(value) }} onMouseLeave={handle2} />
            {hover && value._id==list[0] ?  <> <div id="label"> {value.label}</div> <br />  <button id="delete" onClick={(e) => { handleDelete(value) }}>Delete</button></>
              : null}
          </div>
        )
      })
      }
      {/* {list.length!==0 && list.map((val,key)=>{
            return(
              <> 
              
                {hover ? <> <div id="label"> {val.label}</div> <br/>  <button id="delete" onClick={(e)=>{handleDelete(val)}}>Delete</button></> 
                 : null }
              </>
            )
          })} */}


      {display ? <>
        <div id="f1">
          <div id="f2">
            <h1 className="naminging">Upload Photos</h1>
          </div>
          <div id="f3">
            <label htmlFor="label" className="naming" > Label :  </label>
            <input id="title" className="nam" type="text" onChange={(e) => { setlabel(e.target.value) }} value={label} /> <br /><br /> <br />

            <label htmlFor="image" className="naming"> URL :   </label>
            <input id="image" className="nam" type="text" onChange={(e) => { seturl(e.target.value) }} /><br /><br /> <br />

            <button onClick={formsubmit} id="butt">Submit </button>
            <button onClick={removeForm} id="but">Cancel </button>
          </div>
        </div>
      </> : null}
    </>
  )
}
export default MainPage