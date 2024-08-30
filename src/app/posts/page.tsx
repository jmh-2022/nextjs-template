import React from 'react';
import { getPosts } from './_service/postService';

import HeaderBody from '@/components/templates/HeaderBody';

import Link from 'next/link';
import { DivRow } from '@/components/atoms';

export default async function page() {
  const data = await getPosts();

  return (
    <HeaderBody>
      <DivRow></DivRow>
      <div className="gap-3 px-4 max-h-96 overflow-y-auto w-full mt-10">
        <table className="text-center h-full overflow-y-auto">
          <thead className="bg-gray-300">
            <tr>
              <th>id</th>
              <th>title</th>
              <th>userId</th>
            </tr>
          </thead>
          <tbody className="divide-y-1 overflow-y-auto">
            {data.map((v) => (
              <tr key={v.id} className="py-2">
                <td>{v.id}</td>
                <td className="text-left">
                  <Link href={`/posts/${v.id}`}>{v.title}</Link>
                </td>
                <td>{v.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </HeaderBody>
  );
}
