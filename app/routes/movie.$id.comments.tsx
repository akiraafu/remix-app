import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { Form, useLoaderData, useParams } from "@remix-run/react";
import { db } from "~/utils/db.server";

export async function loader({params}:LoaderArgs){
    const data = await db.comment.findMany({
        where:{
            movieId: params.id
        },
        orderBy:{
            createdAt:'desc'
        }
    })
    return json({data})
}

export async function action({}:ActionArgs){
    
}

export default function Comments(){
    const {id} = useParams()
    const {data} = useLoaderData<typeof loader>()
    return (
        <div className="rounded-lg border p-3">
            <h2 className="text-xl font-semibold mb-5">Your Opinion</h2>
            <div>
                <Form>
                    <textarea name="comment" className="w-full border border-teal-500 rounded-lg p-2"></textarea>
                    <input type="hidden" name="id" value={id} />
                    <button type="submit" className="bg-teal-500 px-4 py-2 rounded-lg text-white">Submit</button>
                </Form>
                <div className="mt-5 flex flex-col gap-y-3">
                    {data.map((post) =>(
                        <div key={post.id} className="" >
                            <p>{post.message}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}