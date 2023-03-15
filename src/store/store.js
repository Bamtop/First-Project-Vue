import { charactersModule } from '@/store/characters.module'
import { createStore } from 'vuex'
import {filtersModule} from "@/store/filters.module";

export const store = createStore({
    modules: {
        filters: filtersModule,
        characters: charactersModule
    }
})
