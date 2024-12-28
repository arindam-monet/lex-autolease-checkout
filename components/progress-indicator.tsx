import { Check, Lock } from 'lucide-react'

export function ProgressIndicator() {
  return (
    <div className="container mx-auto px-4 py-4 border-b">
      
      <div className="flex items-center justify-center mt-6 relative">
        <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gray-200 -translate-y-1/2 z-0" />
        <div className="absolute left-0 right-1/2 top-1/2 h-[2px] bg-green-600 -translate-y-1/2 z-0" />
        
        <div className="flex justify-center gap-20 relative z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
              <Check className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm">Trolley</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
              <span className="text-white font-medium">2</span>
            </div>
            <span className="text-sm">Confirm</span>
          </div>
        </div>
      </div>
    </div>
  )
}
