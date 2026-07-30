import {provideHttpClient, withFetch} from '@angular/common/http';
import {ApplicationConfig, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling} from '@angular/router';

import {definePreset} from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import {providePrimeNG} from 'primeng/config';

import {appRoutes} from './app.routes';



export const EduRankPreset = definePreset(Aura, {
    primitive: {
        blue: {
            50: '#EFF6FF',
            100: '#DBEAFE',
            200: '#BFDBFE',
            300: '#93C5FD',
            400: '#60A5FA',
            500: '#2563EB',
            600: '#1E40AF',
            700: '#1E3A8A',
            800: '#172554',
            900: '#0F172A',
            950: '#020617'
        },

        yellow: {
            50: '#FEFCE8',
            100: '#FEF9C3',
            200: '#FEF08A',
            300: '#FDE047',
            400: '#FACC15',
            500: '#EAB308',
            600: '#CA8A04',
            700: '#A16207',
            800: '#854D0E',
            900: '#713F12',
            950: '#422006'
        }
    },

    semantic: {
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        },

        colorScheme: {
            light: {
                primary: {
                    color: '{primary.600}',
                    contrastColor: '#ffffff',
                    hoverColor: '{primary.700}',
                    activeColor: '{primary.800}'
                }
            },

            dark: {
                primary: {
                    color: '{primary.400}',
                    contrastColor: '{surface.900}',
                    hoverColor: '{primary.300}',
                    activeColor: '{primary.200}'
                }
            }
        }
    }
});

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(
            appRoutes,
            withInMemoryScrolling({
                anchorScrolling: 'enabled',
                scrollPositionRestoration: 'enabled'
            }),
            withEnabledBlockingInitialNavigation()
        ),
        provideHttpClient(withFetch()),
        provideZonelessChangeDetection(),
        providePrimeNG({
            theme: {
                preset: EduRankPreset,
                options: {
                    darkModeSelector: '.app-dark'
                }
            }
        })
    ]
};
