export default function Divider({title}: {title: string}){
  return(
    <div className={`flex w-full justify-center items-center gap-4`}>
      <div className={`bg-gray-300 h-0.5 flex-grow`}></div>
      <h3 className={`text-l font-bold tracking-wide`}>{title}</h3>
      <div className={`bg-gray-300 h-0.5 flex-grow`}></div>
    </div>
  )
}