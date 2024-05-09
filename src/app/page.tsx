import { MainColumn, DivRow, DivColumn } from '@/components/atoms';
import Button from '@/components/atoms/Button';

import Link from 'next/link';

export default function Home() {
  return (
    <MainColumn className="p-4">
      <DivRow className="gap-4">
        <Link href={'/posts'}>
          <Button
            variant={'grey'}
            size={'md'}
            label="서버"
            className="text-white"
          />
        </Link>
        <Link href={'/posts/client'}>
          <Button
            variant={'grey'}
            size={'md'}
            label="클라이언트"
            className="text-white"
          />
        </Link>
      </DivRow>
    </MainColumn>
  );
}
