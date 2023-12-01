export default function Page() {
  return (
    <div>
      首页哦
      <div className="overflow-auto flex-1">
        {[1, 2, 3, 4, 5, 6].map((item) => {
          return <div className="mb-20 bg-cyan-200 h-96" key={item}></div>
        })}
      </div>
    </div>
  )
}
