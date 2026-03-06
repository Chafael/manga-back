import { Controller, Get, Query } from '@nestjs/common';
import { MangasService } from './mangas.service';
import { SearchMangaDto } from './dto/search-manga.dto';

@Controller('mangas')
export class MangasController {
    constructor(private readonly mangasService: MangasService) { }

    @Get()
    search(@Query() searchMangaDto: SearchMangaDto) {
        return this.mangasService.search(searchMangaDto);
    }
}
