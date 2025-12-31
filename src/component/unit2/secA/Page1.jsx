
const Page1 = ({ bgImage }) => {
  return (
    <div
      className="page_1-background"

    >
      <img 
      src={bgImage}
      loading="lazy"
      />
      
    </div>
  )
}

export default Page1;