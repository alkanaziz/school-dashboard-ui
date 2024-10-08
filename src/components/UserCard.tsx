const UserCard = ({type}:{type:string}) => {
  return (
    <div className='rounded-2xl odd:bg-privatPurple even:bg-privatSky'>{type}</div>
  )
}

export default UserCard