import { getAdminProjects } from "../actions/projects/routes";

export default async function AdminProjectsPage() {
	const { projects, counts } = await getAdminProjects();

	return (
		<section className="p-10 bg-black text-white min-h-screen">
			<h1 className="text-3xl font-bold mb-8">Projects</h1>

			{/* Summary boxes */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
				{Object.entries(counts).map(([key, val]) => (
					<div
						key={key}
						className="bg-purple-900/40 p-4 rounded-xl text-center"
					>
						<h2 className="capitalize">{key}</h2>
						<p className="text-2xl font-bold">{String(val)}</p>
					</div>
				))}
			</div>

			{/* Projects table */}
			<table className="w-full text-left border-collapse">
				<thead>
					<tr className="border-b border-gray-700 text-purple-400">
						<th className="py-3">Title</th>
						<th>Status</th>
						<th>Year</th>
						<th>Tech</th>
					</tr>
				</thead>
				<tbody>
					{projects.map((p: any) => (
						<tr
							key={p.id}
							className="border-b border-gray-800 hover:bg-purple-950/20"
						>
							<td className="py-2">{p.title}</td>
							<td>{p.status}</td>
							<td>{p.year}</td>
							<td>{Array.isArray(p.tech) ? p.tech.join(", ") : p.tech}</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}
