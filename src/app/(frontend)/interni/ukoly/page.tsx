import { client } from "@/sanity/lib/client"
import { INTERNAL_TASKS_QUERY } from "@/sanity/lib/queries"
import { CheckCircle2, Circle, Info, User, ClipboardList } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function UkolyPage() {
	const tasklists = await client.fetch(INTERNAL_TASKS_QUERY)

	return (
		<div className="max-w-4xl mx-auto px-6 py-12">
			<h1 className="text-3xl font-black mb-8 flex items-center gap-3">
				<ClipboardList className="text-blue-600" size={32} />
				Organizace a úkoly
			</h1>

			<div className="space-y-12">
				{tasklists?.map((list: any) => (
					<section key={list._id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
						<div className="bg-slate-50 px-8 py-6 border-b border-slate-200">
							<h2 className="text-xl font-bold text-slate-900">{list.title}</h2>
							<p className="text-sm text-slate-500 mt-1">
								Akce: <span className="font-semibold">{list.eventName}</span>
							</p>
						</div>

						<div className="divide-y divide-slate-100">
							{list.items?.map((item: any) => (
								<div key={item._key} className={`p-6 flex gap-4 ${item.isCompleted ? 'bg-slate-50/50' : ''}`}>
									<div className="mt-1">
										{item.type === 'INFO' ? (
											<Info className="text-blue-500" size={20} />
										) : item.isCompleted ? (
											<CheckCircle2 className="text-green-500" size={20} />
										) : (
											<Circle className="text-slate-300" size={20} />
										)}
									</div>

									<div className="flex-1">
										<p className={`font-semibold ${item.isCompleted ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
											{item.label}
										</p>

										{item.notes && <p className="text-sm text-slate-500 mt-1">{item.notes}</p>}

										{item.assignee && (
											<div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
												<User size={12} />
												{item.assignee}
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					</section>
				))}
			</div>
		</div>
	)
}