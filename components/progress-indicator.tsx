import { Check, Lock } from 'lucide-react'

export function ProgressIndicator() {
  return (
    <div className="container mx-auto px-4 py-4"> 
      <div className="flex items-center justify-center relative">
        <div className="absolute left-0 right-0 top-1/3 h-[2px] bg-gray-200 -translate-y-1/2 z-0" />
        <div className="absolute left-0 right-1/2 top-1/3 h-[2px] bg-green-600 -translate-y-1/2 z-0" />
        
        <div className="flex justify-between w-full max-w-[280px] relative z-10">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center mb-2">
              <Check className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs text-gray-600">Trolley</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center mb-2">
              <span className="text-white font-medium text-sm">2</span>
            </div>
            <span className="text-xs font-medium">Confirm</span>
          </div>
        </div>
      </div>
    </div>
  )
}

