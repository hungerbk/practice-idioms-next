interface FallingWordProps {
  id: number
  top: number
  left: number
  pronunciation: string
}

export default function FallingWord({
  id,
  top,
  left,
  pronunciation
}: FallingWordProps) {
  return (
    <div
      key={id}
      className="absolute text-2xl font-bold text-gray-800"
      style={{
        top: `${top}px`,
        left: `${left}px`,
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        minWidth: '100px',
        textAlign: 'center'
      }}>
      {pronunciation}
    </div>
  )
}
