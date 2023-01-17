import './style.css'

export default function Loading(props: {isLoading: boolean}){
  if(!props.isLoading) return <></>
  return(
    <div className='loaderContainer'>
      <div className="loader"></div>
    </div>
  )
}
