import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, FileText } from "lucide-react";
import Link from "next/link";
import { ContentResponse } from "@/lib/api/types";

interface ContentTileProps {
  content: ContentResponse;
}

export default function ContentTile({ content }: ContentTileProps) {
  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow">
      <Link href={`/${content.slug}`} className="block h-full">
        <CardHeader>
          <CardTitle className="line-clamp-2">{content.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
            <FileText className="h-4 w-4" />
            <span>{content.contentType.name}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={content.createdAt}>
              {new Date(content.createdAt).toLocaleDateString()}
            </time>
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <Badge variant={content.published ? "default" : "secondary"}>
            {content.published ? "Published" : "Draft"}
          </Badge>
        </CardFooter>
      </Link>
    </Card>
  );
}
