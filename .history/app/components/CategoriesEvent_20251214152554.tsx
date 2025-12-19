import { CATEGORIES } from '@/lib/data'
import { Icon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CategoriesEvent() {
  return (
    <section className='space-y-6'>
        
    <h2 className="text-xl font-semibold my-6">Browse by Category</h2>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>

        {CATEGORIES.map((category)=> {
             const Icon = category.icon
             return (
                <Link
                  key={category.id}
                  href={`/explore/${category.id}`}
                  className="group"
                >
                  <div className="flex items-center gap-4 rounded-2xl border bg-background p-5 hover:shadow-lg transition-all duration-300">
                    
                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted group-hover:bg-primary/10 transition">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
    
                    {/* Text */}
                    <div className="flex-1">
                      <p className="font-medium">{category.label}</p>
                      <p className="text-sm text-muted-foreground">
                        Browse events
                      </p>
                    </div>
                  </div>
                </Link>
              )   
            })}
    </div>
    </section>
  )
}

export default CategoriesEvent