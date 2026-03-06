import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SearchMangaDto } from './dto/search-manga.dto';

@Injectable()
export class MangasService {
    private readonly baseUrl: string;

    constructor(private readonly configService: ConfigService) {
        this.baseUrl = this.configService.get<string>('JIKAN_API_URL', 'https://api.jikan.moe/v4');
    }

    async search(searchMangaDto: SearchMangaDto) {
        const params = new URLSearchParams();

        params.append('q', searchMangaDto.q);

        if (searchMangaDto.page) {
            params.append('page', searchMangaDto.page.toString());
        }
        if (searchMangaDto.limit) {
            params.append('limit', searchMangaDto.limit.toString());
        }

        const url = `${this.baseUrl}/manga?${params.toString()}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}
