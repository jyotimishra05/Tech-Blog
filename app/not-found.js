import Link from "next/link"


const NotFound = () => {
  return (
    <div>
      <h1>Not-Found</h1>
      <p>Sorry! The Page you looking for doesn't exist.</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}

export default NotFound
