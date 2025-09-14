import { Component } from '@angular/core';
import { DefaultLayoutComponent } from 'src/app/shared/ui/default-layout/default-layout.component';

@Component({
  standalone: true,
  selector: 'app-history',
  templateUrl: './history.component.html',
  imports: [DefaultLayoutComponent],
})
export class HistoryComponent {
  quotes = [
    {
      date: '18 août 2004 ~ 29 avril 2009',
      content: `L'histoire intégrale est romancée en exactement 65 chapitres par Menencia durant 5 longues années. Les
      dialogues sont fidèles à ceux du jeu, en particulier pour le CD1, et par la
      suite, inspirés des travaux de Meka S. Ce premier essai d'adaptation en
      roman est désigné comme étant la “version 1”. Durant l'écriture, l'auteur a affirmé vouloir
      écrire une version plus aboutie plus tard.`,
    },
    {
      date: '12 mai 2009',
      content: `La réécriture de la version 1 est possible avec l'arrivée de Darksun quelques mois plus tôt. Le
      prologue est alors réécrit et publié après la finalisation de la version 1. Il s'agira davantage d'un <i>proof
        of concept</i> pour donner un aperçu de la qualité de la "version 2".`,
    },
    {
      date: '9 février 2011',
      content: `La version 2 n'avance finalement pas du tout, en partie à cause de l'absence de Darksun. L'un des
      lecteurs, Jam, rejoint alors l'équipe. Pour ne pas perdre le travail de Darksun, il est décidé de conserver
      son travail au maximum.`,
    },
    {
      date: '17 octobre 2011 ~ 20 août 2012',
      content: `Les 15 premiers chapitres de la version 2, initialement écrits par Darksun, sont enfin publiés. Puis, les
      chapitres 16 à 22 écrits cette fois-ci par Jam sont publiés à leur tour. Finalement, il est décidé de retirer
      la version 1 du site.`,
    },
    {
      date: '7 avril 2013 ~ 7 février 2017',
      content: `Tous les 7 du mois, un chapitre inédit, écrit par Jam, est publié de façon régulière. Pendant cette période,
      pas moins de 50 chapitres (du 23 au 72) seront ainsi publiés.`,
    },
    {
      date: '24 décembre 2018',
      content: `Après une longue pause de presque 2 ans, la publication reprend enfin avec le chapitre
      spécial Noël 2018. C'est la dernière ligne droite pour terminer ce projet !`,
    },
    {
      date: '7 janvier 2020',
      content: `Publication des derniers chapitres : le roman est enfin au complet (version 2.0) ! nous
      prévoyons maintenant de remastériser la partie Midgar, soit les 11 premiers chapitres
      pour y apporter plus de profondeur et de qualité.`,
    },
  ];
}
