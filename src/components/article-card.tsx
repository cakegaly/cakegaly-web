import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Article } from '@/lib/microcms';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';

interface ArticleCardProps {
  article: Article;
  priority?: boolean;
}

export function ArticleCard({ article, priority = false }: ArticleCardProps) {
  return (
    <Card className="hover:opacity-50">
      {article.thumbnail && (
        <Image
          src={article.thumbnail.url}
          className="aspect-video w-full overflow-hidden rounded-t-md object-cover"
          width={article.thumbnail.width}
          height={article.thumbnail.height}
          alt={article.title}
          priority={priority}
        />
      )}
      <CardContent className="px-4 pb-4">
        <div className="my-2 flex items-center">
          <Badge className="mr-2 bg-[#445566] text-center text-xs text-tertiary">
            {'カテゴリ名'}
          </Badge>
          <p className="text-xs font-bold tracking-widest text-gray-500 md:text-sm">
            {formatDate(article.createdAt)}
          </p>
        </div>
        <div className="line-clamp-2 text-sm font-bold md:text-base">
          {article.title}
        </div>
      </CardContent>
    </Card>
  );
}
