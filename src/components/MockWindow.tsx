import { Input } from 'antd';
import type { InputRef } from 'antd'
import { Loading } from './recordStatus';
import { useState, useRef } from 'react';
import { navigate } from '../apis/screen';

const MockWindow = (props: { className: string, html?: string, title?: string }) => {
    const [inputValue, setInputValue] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const inputRef = useRef<InputRef>(null);
    const suffix = <svg xmlns="http://www.w3.org/2000/svg" className="h-4" viewBox="0 0 512 512"><path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z"/></svg>
//     const defaultHTML = `
//     <div class="text-lg">
//  <h2 class="font-bold text-2xl">
//   Discover popular bus routes
//  </h2>
//  <ul class="list-disc list-inside">
//   <li>
//    <a href="/en-us/bus-from-atlantic-city-to-new-york" class="underline text-blue-500">
//     Atlantic City NJ to New York NY
//    </a>
//   </li>
//   <li>
//    <a href="/en-us/bus-from-new-york-to-philadelphia" class="underline text-blue-500">
//     New York NY to Philadelphia PA
//    </a>
//   </li>
//   <li>
//    <a href="/en-us/bus-from-albany-3-to-new-york" class="underline text-blue-500">
//     Albany NY to Ney York NY
//    </a>
//   </li>
//   <li>
//    <a href="/en-us/bus-from-boston-to-new-york" class="underline text-blue-500">
//     Boston MA to New York NY
//    </a>
//   </li>
//   <li>
//    <a href="/en-us/bus-from-new-york-to-syracuse-1" class="underline text-blue-500">
//     New York NY to Syracuse NY
//    </a>
//   </li>
//   <li>
//    <a href="/en-us/bus-from-las-vegas-1-to-los-angeles" class="underline text-blue-500">
//     Las Vegas NV to Los Angeles CA
//    </a>
//   </li>
//   <li>
//    <a href="/en-us/bus-from-binghamton-to-new-york" class="underline text-blue-500">
//     Binghamton NY to New York NY
//    </a>
//   </li>
//   <li>
//    <a href="/en-us/bus-from-baltimore-to-new-york" class="underline text-blue-500">
//     Baltimore MD to New York NY
//    </a>
//   </li>
//   <li>
//    <a href="/en-us/bus-from-dallas-to-houston" class="underline text-blue-500">
//     Dallas TX to Houston TX
//    </a>
//   </li>
//   <li>
//    <a href="/en-us/bus-from-new-york-to-washington-2" class="underline text-blue-500">
//     New York NY to Washington DC
//    </a>
//   </li>
//   <li>
//    <a href="/en-us/bus-from-monterrey-to-nuevo-laredo" class="underline text-blue-500">
//     Monterrey MX to Nuevo Laredo MX
//    </a>
//   </li>
//   <li>
//    <a href="/en-us/bus-from-buffalo-to-new-york" class="underline text-blue-500">
//     Buffalo NY to New York NY
//    </a>
//   </li>
//   <li>
//    <a href="/en-us/bus-from-chicago-to-minneapolis" class="underline text-blue-500">
//     Chicago IL to Minneapolis MN
//    </a>
//   </li>
//   <li>
//    <a href="/en-us/bus-from-houston-to-san-antonio" class="underline text-blue-500">
//     Houston TX to San Antonio TX
//    </a>
//   </li>
//   <li>
//    <a href="/en-us/bus-from-los-angeles-to-phoenix" class="underline text-blue-500">
//     Los Angeles CA to Phoenix AZ
//    </a>
//   </li>
//   <li>
//    <a href="/en-us/bus-from-new-york-to-montreal" class="underline text-blue-500">
//     New York NY to Montreal QC
//    </a>
//   </li>
//   <li>
//    <a href="/en-us/bus-from-miami-to-orlando" class="underline text-blue-500">
//     Miami FL to Orlando FL
//    </a>
//   </li>
//   <li>
//    <a href="/en-us/bus-from-los-angeles-to-san-diego-1" class="underline text-blue-500">
//     Los Angeles CA to San Diego CA
//    </a>
//   </li>
//   <li>
//    <a href="/en-us/bus-from-toronto-to-new-york" class="underline text-blue-500">
//     Toronto ON to New York NY
//    </a>
//   </li>
//   <li>
//    <a href="/en-us/bus-from-vancouver-to-seattle" class="underline text-blue-500">
//     Vancouver BC to Seattle WA
//    </a>
//   </li>
//  </ul>
// </div>
//   `
    const defaultHTML = `
    <html><head></head><body>
    <style></style><ul class="ResultsList__resultsList___eGsLK">
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 1:20â€¯pm till Thu, Aug 3 at 7:30â€¯pm for
        $88.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 1:20â€¯pm</span><span>1:20â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 6:10 hrs</span><span> 6:10 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 7:30â€¯pm </span><span>7:30â€¯pm</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Downey (Stonewood Center)</span><span>Downey (Stonewood Center)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Las Vegas Strip (Las Vegas Blvd)</span><span>Las Vegas Strip (Las Vegas Blvd)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowMessage___jxm8z">
          <span class="SearchResult__seatsLeft___UkJBY">Only 1 seat available!</span>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$88.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$88<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="SearchResult__capacity___di8HI SearchResult__withDivider___hHjZX">
              <div class="RideCapacity__busCapacity___VoHUl RideCapacity__hasLabel___ekPDc">
                <span class="hci-icon RideCapacity__iconCapacity___mjkiC"></span><span class="RideCapacity__busCapacityText___xGKoW">Almost full</span>
              </div>
            </div>
            <div class="SearchResult__usps___xQu9R">
              <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
                <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 1:20â€¯pm till Thu, Aug 3 at 7:55â€¯pm for
        $88.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 1:20â€¯pm</span><span>1:20â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 6:35 hrs</span><span> 6:35 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 7:55â€¯pm </span><span>7:55â€¯pm</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Downey (Stonewood Center)</span><span>Downey (Stonewood Center)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Downtown Las Vegas (1st St)</span><span>Downtown Las Vegas (1st St)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowMessage___jxm8z">
          <span class="SearchResult__seatsLeft___UkJBY">Only 1 seat available!</span>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$88.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$88<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="SearchResult__capacity___di8HI SearchResult__withDivider___hHjZX">
              <div class="RideCapacity__busCapacity___VoHUl RideCapacity__hasLabel___ekPDc">
                <span class="hci-icon RideCapacity__iconCapacity___mjkiC"></span><span class="RideCapacity__busCapacityText___xGKoW">Almost full</span>
              </div>
            </div>
            <div class="SearchResult__usps___xQu9R">
              <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
                <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 1:20â€¯pm till Thu, Aug 3 at 8:20â€¯pm for
        $88.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 1:20â€¯pm</span><span>1:20â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 7:00 hrs</span><span> 7:00 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 8:20â€¯pm </span><span>8:20â€¯pm</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Downey (Stonewood Center)</span><span>Downey (Stonewood Center)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Henderson (Galleria at Sunset)</span><span>Henderson (Galleria at Sunset)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowMessage___jxm8z">
          <span class="SearchResult__seatsLeft___UkJBY">Only 1 seat available!</span>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$88.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$88<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="SearchResult__capacity___di8HI SearchResult__withDivider___hHjZX">
              <div class="RideCapacity__busCapacity___VoHUl RideCapacity__hasLabel___ekPDc">
                <span class="hci-icon RideCapacity__iconCapacity___mjkiC"></span><span class="RideCapacity__busCapacityText___xGKoW">Almost full</span>
              </div>
            </div>
            <div class="SearchResult__usps___xQu9R">
              <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
                <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 2:00â€¯pm till Thu, Aug 3 at 7:30â€¯pm for
        $88.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 2:00â€¯pm</span><span>2:00â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 5:30 hrs</span><span> 5:30 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 7:30â€¯pm </span><span>7:30â€¯pm</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Downtown LA (FlixBus Lot)</span><span>Downtown LA (FlixBus Lot)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Las Vegas Strip (Las Vegas Blvd)</span><span>Las Vegas Strip (Las Vegas Blvd)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowMessage___jxm8z">
          <span class="SearchResult__seatsLeft___UkJBY">Only 1 seat available!</span>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$88.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$88<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="SearchResult__capacity___di8HI SearchResult__withDivider___hHjZX">
              <div class="RideCapacity__busCapacity___VoHUl RideCapacity__hasLabel___ekPDc">
                <span class="hci-icon RideCapacity__iconCapacity___mjkiC"></span><span class="RideCapacity__busCapacityText___xGKoW">Almost full</span>
              </div>
            </div>
            <div class="SearchResult__usps___xQu9R">
              <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
                <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 2:00â€¯pm till Thu, Aug 3 at 7:55â€¯pm for
        $88.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 2:00â€¯pm</span><span>2:00â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 5:55 hrs</span><span> 5:55 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 7:55â€¯pm </span><span>7:55â€¯pm</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Downtown LA (FlixBus Lot)</span><span>Downtown LA (FlixBus Lot)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Downtown Las Vegas (1st St)</span><span>Downtown Las Vegas (1st St)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowMessage___jxm8z">
          <span class="SearchResult__seatsLeft___UkJBY">Only 1 seat available!</span>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$88.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$88<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="SearchResult__capacity___di8HI SearchResult__withDivider___hHjZX">
              <div class="RideCapacity__busCapacity___VoHUl RideCapacity__hasLabel___ekPDc">
                <span class="hci-icon RideCapacity__iconCapacity___mjkiC"></span><span class="RideCapacity__busCapacityText___xGKoW">Almost full</span>
              </div>
            </div>
            <div class="SearchResult__usps___xQu9R">
              <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
                <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 2:00â€¯pm till Thu, Aug 3 at 8:20â€¯pm for
        $88.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 2:00â€¯pm</span><span>2:00â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 6:20 hrs</span><span> 6:20 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 8:20â€¯pm </span><span>8:20â€¯pm</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Downtown LA (FlixBus Lot)</span><span>Downtown LA (FlixBus Lot)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Henderson (Galleria at Sunset)</span><span>Henderson (Galleria at Sunset)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowMessage___jxm8z">
          <span class="SearchResult__seatsLeft___UkJBY">Only 1 seat available!</span>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$88.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$88<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="SearchResult__capacity___di8HI SearchResult__withDivider___hHjZX">
              <div class="RideCapacity__busCapacity___VoHUl RideCapacity__hasLabel___ekPDc">
                <span class="hci-icon RideCapacity__iconCapacity___mjkiC"></span><span class="RideCapacity__busCapacityText___xGKoW">Almost full</span>
              </div>
            </div>
            <div class="SearchResult__usps___xQu9R">
              <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
                <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 3:00â€¯pm till Thu, Aug 3 at 9:00â€¯pm for
        $47.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 3:00â€¯pm</span><span>3:00â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 6:00 hrs</span><span> 6:00 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 9:00â€¯pm </span><span>9:00â€¯pm</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Downtown LA (FlixBus Lot)</span><span>Downtown LA (FlixBus Lot)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Las Vegas Strip (Las Vegas Blvd)</span><span>Las Vegas Strip (Las Vegas Blvd)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$47.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$47<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
              <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 3:00â€¯pm till Thu, Aug 3 at 9:25â€¯pm for
        $47.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 3:00â€¯pm</span><span>3:00â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 6:25 hrs</span><span> 6:25 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 9:25â€¯pm </span><span>9:25â€¯pm</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Downtown LA (FlixBus Lot)</span><span>Downtown LA (FlixBus Lot)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Downtown Las Vegas (1st St)</span><span>Downtown Las Vegas (1st St)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$47.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$47<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
              <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 3:10â€¯pm till Thu, Aug 3 at 10:10â€¯pm for
        $47.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 3:10â€¯pm</span><span>3:10â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 7:00 hrs</span><span> 7:00 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 10:10â€¯pm </span><span>10:10â€¯pm</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Hollywood / Highland (LA)</span><span>Hollywood / Highland (LA)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Las Vegas Strip (Las Vegas Blvd)</span><span>Las Vegas Strip (Las Vegas Blvd)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$47.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$47<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
              <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 3:10â€¯pm till Thu, Aug 3 at 10:35â€¯pm for
        $47.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 3:10â€¯pm</span><span>3:10â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 7:25 hrs</span><span> 7:25 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 10:35â€¯pm </span><span>10:35â€¯pm</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Hollywood / Highland (LA)</span><span>Hollywood / Highland (LA)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Downtown Las Vegas (1st St)</span><span>Downtown Las Vegas (1st St)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$47.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$47<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
              <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 4:00â€¯pm till Thu, Aug 3 at 10:10â€¯pm for
        $42.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 4:00â€¯pm</span><span>4:00â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 6:10 hrs</span><span> 6:10 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 10:10â€¯pm </span><span>10:10â€¯pm</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Downtown LA (FlixBus Lot)</span><span>Downtown LA (FlixBus Lot)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Las Vegas Strip (Las Vegas Blvd)</span><span>Las Vegas Strip (Las Vegas Blvd)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__cheapestFastest___t3Hzo SearchResult__cheapestFastestSingle___dKC_Y">
          <div class="CheapestFastestTitle__cheapestFastestTitle___vD6w0">
            LOWEST PRICE
          </div>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$42.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw undefined">$42<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
              <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 4:00â€¯pm till Thu, Aug 3 at 10:35â€¯pm for
        $47.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 4:00â€¯pm</span><span>4:00â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 6:35 hrs</span><span> 6:35 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 10:35â€¯pm </span><span>10:35â€¯pm</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Downtown LA (FlixBus Lot)</span><span>Downtown LA (FlixBus Lot)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Downtown Las Vegas (1st St)</span><span>Downtown Las Vegas (1st St)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$47.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$47<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
              <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 4:25â€¯pm till Thu, Aug 3 at 10:00â€¯pm for
        $67.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            Greyhound
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 4:25â€¯pm</span><span>4:25â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 5:35 hrs</span><span> 5:35 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 10:00â€¯pm </span><span>10:00â€¯pm</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Los Angeles Union Station</span><span>Los Angeles Union Station</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:South Strip</span><span>South Strip</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$67.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$67<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="SearchResult__capacity___di8HI SearchResult__withDivider___hHjZX">
              <div class="RideCapacity__busCapacity___VoHUl RideCapacity__hasLabel___ekPDc">
                <span class="hci-icon RideCapacity__iconCapacity___mjkiC"></span><span class="RideCapacity__busCapacityText___xGKoW">Almost full</span>
              </div>
            </div>
            <div class="SearchResult__usps___xQu9R">
              <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
                <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 5:25â€¯pm till Thu, Aug 3 at 11:20â€¯pm for
        $59.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 5:25â€¯pm</span><span>5:25â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 5:55 hrs</span><span> 5:55 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 11:20â€¯pm </span><span>11:20â€¯pm</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:USC (Hope/Jefferson)</span><span>USC (Hope/Jefferson)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Las Vegas Strip (Las Vegas Blvd)</span><span>Las Vegas Strip (Las Vegas Blvd)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$59.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$59<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="SearchResult__capacity___di8HI SearchResult__withDivider___hHjZX">
              <div class="RideCapacity__busCapacity___VoHUl RideCapacity__hasLabel___ekPDc">
                <span class="hci-icon RideCapacity__iconCapacity___mjkiC"></span><span class="RideCapacity__busCapacityText___xGKoW">Almost full</span>
              </div>
            </div>
            <div class="SearchResult__usps___xQu9R">
              <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
                <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 5:25â€¯pm till Thu, Aug 3 at 11:45â€¯pm for
        $59.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 5:25â€¯pm</span><span>5:25â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 6:20 hrs</span><span> 6:20 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 11:45â€¯pm </span><span>11:45â€¯pm</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:USC (Hope/Jefferson)</span><span>USC (Hope/Jefferson)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Downtown Las Vegas (1st St)</span><span>Downtown Las Vegas (1st St)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$59.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$59<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="SearchResult__capacity___di8HI SearchResult__withDivider___hHjZX">
              <div class="RideCapacity__busCapacity___VoHUl RideCapacity__hasLabel___ekPDc">
                <span class="hci-icon RideCapacity__iconCapacity___mjkiC"></span><span class="RideCapacity__busCapacityText___xGKoW">Almost full</span>
              </div>
            </div>
            <div class="SearchResult__usps___xQu9R">
              <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
                <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 6:00â€¯pm till Thu, Aug 3 at 11:20â€¯pm for
        $52.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 6:00â€¯pm</span><span>6:00â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 5:20 hrs</span><span> 5:20 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 11:20â€¯pm </span><span>11:20â€¯pm</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Downtown LA (FlixBus Lot)</span><span>Downtown LA (FlixBus Lot)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Las Vegas Strip (Las Vegas Blvd)</span><span>Las Vegas Strip (Las Vegas Blvd)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowMessage___jxm8z">
          <span class="SearchResult__seatsLeft___UkJBY">3 seats left at this price</span>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$52.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$52<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="SearchResult__capacity___di8HI SearchResult__withDivider___hHjZX">
              <div class="RideCapacity__busCapacity___VoHUl RideCapacity__hasLabel___ekPDc">
                <span class="hci-icon RideCapacity__iconCapacity___mjkiC"></span><span class="RideCapacity__busCapacityText___xGKoW">Almost full</span>
              </div>
            </div>
            <div class="SearchResult__usps___xQu9R">
              <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
                <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 6:00â€¯pm till Thu, Aug 3 at 11:45â€¯pm for
        $52.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 6:00â€¯pm</span><span>6:00â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 5:45 hrs</span><span> 5:45 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 11:45â€¯pm </span><span>11:45â€¯pm</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Downtown LA (FlixBus Lot)</span><span>Downtown LA (FlixBus Lot)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Downtown Las Vegas (1st St)</span><span>Downtown Las Vegas (1st St)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowMessage___jxm8z">
          <span class="SearchResult__seatsLeft___UkJBY">2 seats left at this price</span>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$52.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$52<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="SearchResult__capacity___di8HI SearchResult__withDivider___hHjZX">
              <div class="RideCapacity__busCapacity___VoHUl RideCapacity__hasLabel___ekPDc">
                <span class="hci-icon RideCapacity__iconCapacity___mjkiC"></span><span class="RideCapacity__busCapacityText___xGKoW">Almost full</span>
              </div>
            </div>
            <div class="SearchResult__usps___xQu9R">
              <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
                <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 6:40â€¯pm till Fri, Aug 4 at 12:45â€¯am for
        $88.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            Greyhound
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 6:40â€¯pm</span><span>6:40â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 6:05 hrs</span><span> 6:05 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 12:45â€¯am +1 day</span><span>12:45â€¯am</span><span class="LocationsHorizontal__dayDiff___xPn_D">+1 day</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Los Angeles Union Station</span><span>Los Angeles Union Station</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:South Strip</span><span>South Strip</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowMessage___jxm8z">
          <span class="SearchResult__seatsLeft___UkJBY">2 seats left at this price</span>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$88.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$88<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="SearchResult__capacity___di8HI SearchResult__withDivider___hHjZX">
              <div class="RideCapacity__busCapacity___VoHUl RideCapacity__hasLabel___ekPDc">
                <span class="hci-icon RideCapacity__iconCapacity___mjkiC"></span><span class="RideCapacity__busCapacityText___xGKoW">Almost full</span>
              </div>
            </div>
            <div class="SearchResult__usps___xQu9R">
              <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
                <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 7:00â€¯pm till Thu, Aug 3 at 11:59â€¯pm for
        $42.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 7:00â€¯pm</span><span>7:00â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 4:59 hrs</span><span> 4:59 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 11:59â€¯pm </span><span>11:59â€¯pm</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Downtown LA (FlixBus Lot)</span><span>Downtown LA (FlixBus Lot)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Las Vegas Strip (Las Vegas Blvd)</span><span>Las Vegas Strip (Las Vegas Blvd)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__cheapestFastest___t3Hzo SearchResult__cheapestFastestSingle___dKC_Y">
          <div class="CheapestFastestTitle__cheapestFastestTitle___vD6w0">
            LOWEST PRICE
          </div>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$42.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw undefined">$42<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
              <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 7:00â€¯pm till Fri, Aug 4 at 12:20â€¯am for
        $47.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 7:00â€¯pm</span><span>7:00â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 5:20 hrs</span><span> 5:20 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 12:20â€¯am +1 day</span><span>12:20â€¯am</span><span class="LocationsHorizontal__dayDiff___xPn_D">+1 day</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Downtown LA (FlixBus Lot)</span><span>Downtown LA (FlixBus Lot)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Downtown Las Vegas (1st St)</span><span>Downtown Las Vegas (1st St)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$47.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$47<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
              <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ">
      <div class="SearchResult__voText___aFyh5">
        Unavailable trip from Thu, Aug 3 at 9:00â€¯pm till Fri, Aug 4 at 2:25â€¯am
      </div>
      <div class="SearchResult__unbookableTripRow___ZMKF7">
        <div class="SearchResult__locations___DOj9X">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp LocationsHorizontal__isDisabled___HzQnm">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 9:00â€¯pm</span><span>9:00â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU LocationsHorizontal__isDisabled___HzQnm">
                    <span class="DurationTime__voText___N4rJk">Duration: 5:25 hrs</span><span> 5:25 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY LocationsHorizontal__isDisabled___HzQnm">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 2:25â€¯am +1 day</span><span>2:25â€¯am</span><span class="LocationsHorizontal__dayDiff___xPn_D LocationsHorizontal__isDisabled___HzQnm">+1 day</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv LocationsHorizontal__isDisabled___HzQnm">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:UCLA (Gayley/Strathmore)</span><span>UCLA (Gayley/Strathmore)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv LocationsHorizontal__isDisabled___HzQnm">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Las Vegas Strip (Las Vegas Blvd)</span><span>Las Vegas Strip (Las Vegas Blvd)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__resultRestrictedMessages___7qBLw">
          <div class="useResultRestricted__bookingMessage___VxRKf">Sold out</div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ">
      <div class="SearchResult__voText___aFyh5">
        Unavailable trip from Thu, Aug 3 at 9:00â€¯pm till Fri, Aug 4 at 2:45â€¯am
      </div>
      <div class="SearchResult__unbookableTripRow___ZMKF7">
        <div class="SearchResult__locations___DOj9X">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp LocationsHorizontal__isDisabled___HzQnm">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 9:00â€¯pm</span><span>9:00â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU LocationsHorizontal__isDisabled___HzQnm">
                    <span class="DurationTime__voText___N4rJk">Duration: 5:45 hrs</span><span> 5:45 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY LocationsHorizontal__isDisabled___HzQnm">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 2:45â€¯am +1 day</span><span>2:45â€¯am</span><span class="LocationsHorizontal__dayDiff___xPn_D LocationsHorizontal__isDisabled___HzQnm">+1 day</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv LocationsHorizontal__isDisabled___HzQnm">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:UCLA (Gayley/Strathmore)</span><span>UCLA (Gayley/Strathmore)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv LocationsHorizontal__isDisabled___HzQnm">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Downtown Las Vegas (1st St)</span><span>Downtown Las Vegas (1st St)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__resultRestrictedMessages___7qBLw">
          <div class="useResultRestricted__bookingMessage___VxRKf">Sold out</div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ">
      <div class="SearchResult__voText___aFyh5">
        Unavailable trip from Thu, Aug 3 at 9:40â€¯pm till Fri, Aug 4 at 2:25â€¯am
      </div>
      <div class="SearchResult__unbookableTripRow___ZMKF7">
        <div class="SearchResult__locations___DOj9X">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp LocationsHorizontal__isDisabled___HzQnm">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 9:40â€¯pm</span><span>9:40â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU LocationsHorizontal__isDisabled___HzQnm">
                    <span class="DurationTime__voText___N4rJk">Duration: 4:45 hrs</span><span> 4:45 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY LocationsHorizontal__isDisabled___HzQnm">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 2:25â€¯am +1 day</span><span>2:25â€¯am</span><span class="LocationsHorizontal__dayDiff___xPn_D LocationsHorizontal__isDisabled___HzQnm">+1 day</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv LocationsHorizontal__isDisabled___HzQnm">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Downtown LA (FlixBus Lot)</span><span>Downtown LA (FlixBus Lot)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv LocationsHorizontal__isDisabled___HzQnm">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Las Vegas Strip (Las Vegas Blvd)</span><span>Las Vegas Strip (Las Vegas Blvd)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__resultRestrictedMessages___7qBLw">
          <div class="useResultRestricted__bookingMessage___VxRKf">Sold out</div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ">
      <div class="SearchResult__voText___aFyh5">
        Unavailable trip from Thu, Aug 3 at 9:40â€¯pm till Fri, Aug 4 at 2:45â€¯am
      </div>
      <div class="SearchResult__unbookableTripRow___ZMKF7">
        <div class="SearchResult__locations___DOj9X">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp LocationsHorizontal__isDisabled___HzQnm">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 9:40â€¯pm</span><span>9:40â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU LocationsHorizontal__isDisabled___HzQnm">
                    <span class="DurationTime__voText___N4rJk">Duration: 5:05 hrs</span><span> 5:05 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY LocationsHorizontal__isDisabled___HzQnm">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 2:45â€¯am +1 day</span><span>2:45â€¯am</span><span class="LocationsHorizontal__dayDiff___xPn_D LocationsHorizontal__isDisabled___HzQnm">+1 day</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv LocationsHorizontal__isDisabled___HzQnm">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Downtown LA (FlixBus Lot)</span><span>Downtown LA (FlixBus Lot)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv LocationsHorizontal__isDisabled___HzQnm">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Downtown Las Vegas (1st St)</span><span>Downtown Las Vegas (1st St)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__resultRestrictedMessages___7qBLw">
          <div class="useResultRestricted__bookingMessage___VxRKf">Sold out</div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 11:50â€¯pm till Fri, Aug 4 at 4:50â€¯am for
        $67.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            Greyhound
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 11:50â€¯pm</span><span>11:50â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 5:00 hrs</span><span> 5:00 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 4:50â€¯am +1 day</span><span>4:50â€¯am</span><span class="LocationsHorizontal__dayDiff___xPn_D">+1 day</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:Los Angeles Union Station</span><span>Los Angeles Union Station</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:South Strip</span><span>South Strip</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowMessage___jxm8z">
          <span class="SearchResult__seatsLeft___UkJBY">1 seat left at this price</span>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$67.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$67<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="SearchResult__capacity___di8HI SearchResult__withDivider___hHjZX">
              <div class="RideCapacity__busCapacity___VoHUl RideCapacity__hasLabel___ekPDc">
                <span class="hci-icon RideCapacity__iconCapacity___mjkiC"></span><span class="RideCapacity__busCapacityText___xGKoW">Almost full</span>
              </div>
            </div>
            <div class="SearchResult__usps___xQu9R">
              <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
                <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 11:55â€¯pm till Fri, Aug 4 at 5:55â€¯am for
        $67.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 11:55â€¯pm</span><span>11:55â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 6:00 hrs</span><span> 6:00 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 5:55â€¯am +1 day</span><span>5:55â€¯am</span><span class="LocationsHorizontal__dayDiff___xPn_D">+1 day</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:UCLA (Gayley/Strathmore)</span><span>UCLA (Gayley/Strathmore)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Las Vegas Strip (Las Vegas Blvd)</span><span>Las Vegas Strip (Las Vegas Blvd)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowMessage___jxm8z">
          <span class="SearchResult__seatsLeft___UkJBY">3 seats left at this price</span>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$67.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$67<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="SearchResult__capacity___di8HI SearchResult__withDivider___hHjZX">
              <div class="RideCapacity__busCapacity___VoHUl RideCapacity__hasLabel___ekPDc">
                <span class="hci-icon RideCapacity__iconCapacity___mjkiC"></span><span class="RideCapacity__busCapacityText___xGKoW">Almost full</span>
              </div>
            </div>
            <div class="SearchResult__usps___xQu9R">
              <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
                <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 11:55â€¯pm till Fri, Aug 4 at 6:20â€¯am for
        $67.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 11:55â€¯pm</span><span>11:55â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 6:25 hrs</span><span> 6:25 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 6:20â€¯am +1 day</span><span>6:20â€¯am</span><span class="LocationsHorizontal__dayDiff___xPn_D">+1 day</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:UCLA (Gayley/Strathmore)</span><span>UCLA (Gayley/Strathmore)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Downtown Las Vegas (1st St)</span><span>Downtown Las Vegas (1st St)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowMessage___jxm8z">
          <span class="SearchResult__seatsLeft___UkJBY">3 seats left at this price</span>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$67.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$67<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="SearchResult__capacity___di8HI SearchResult__withDivider___hHjZX">
              <div class="RideCapacity__busCapacity___VoHUl RideCapacity__hasLabel___ekPDc">
                <span class="hci-icon RideCapacity__iconCapacity___mjkiC"></span><span class="RideCapacity__busCapacityText___xGKoW">Almost full</span>
              </div>
            </div>
            <div class="SearchResult__usps___xQu9R">
              <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
                <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="SearchResult__searchResult___cgxzZ SearchResult__expandable___M10px">
      <div class="SearchResult__voText___aFyh5">
        Direct trip from Thu, Aug 3 at 11:55â€¯pm till Fri, Aug 4 at 6:50â€¯am for
        $67.99
      </div>
      <div class="SearchResult__main___I4TtH">
        <div class="SearchResult__labelsRow___yUI9I">
          <div class="hcr-tag-7-6-0 hcr-tag--outlined-7-6-0 hcr-tag--small-7-6-0 BrandLabel__brandLabel___NkgP9 fxp1283-listener">
            FlixBus
          </div>
        </div>
        <div class="SearchResult__rowRideAndPrice___u0TJA">
          <div class="hcr-grid-7-6-0 hcr-grid--gutter-2">
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__departure___bnRmG">
                <div class="LocationsHorizontal__time___SaJCp">
                  <span class="LocationsHorizontal__voText___pUgoW">Departure time: 11:55â€¯pm</span><span>11:55â€¯pm</span>
                </div>
                <div class="LocationsHorizontal__duration___rJ6rs">
                  <div class="DurationTime__durationTimeWrapper___f3vHk LocationsHorizontal__durationTime___r1KjU">
                    <span class="DurationTime__voText___N4rJk">Duration: 6:55 hrs</span><span> 6:55 hrs</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <span class="LocationsHorizontal__timeWrapper___TujDY">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival time: 6:50â€¯am +1 day</span><span>6:50â€¯am</span><span class="LocationsHorizontal__dayDiff___xPn_D">+1 day</span></span>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-7-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Departure stop:UCLA (Gayley/Strathmore)</span><span>UCLA (Gayley/Strathmore)</span>
              </div>
            </div>
            <div class="hcr-col-6-7-6-0 hcr-col-5-sm-7-6-0">
              <div class="LocationsHorizontal__station___ItGEv">
                <span class="LocationsHorizontal__voText___pUgoW">Arrival stop:Henderson (Galleria at Sunset)</span><span>Henderson (Galleria at Sunset)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="SearchResult__rowMessage___jxm8z">
          <span class="SearchResult__seatsLeft___UkJBY">3 seats left at this price</span>
        </div>
        <div class="SearchResult__rowInfo___kevIw">
          <div class="SearchResult__transferInfo___ALn3E">
            <div class="hcr-tag-7-6-0 TransferPill__tag___sBzcr">
              <span class="hci-icon"></span><span class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">Bus</span>
              <div class="TransferPill__transferTypeLabel___R7OUb TransferPill__withChanges___I0260">
                Direct
              </div>
              <span class="hci-icon TransferPill__collapsed___h3Xt2 hcr-tag__icon-7-6-0"></span>
            </div>
          </div>
          <div class="SearchResult__bookButtonWrap___bvz2p">
            <div class="SearchResult__hideRoundBookButton___gRnPL">
              <div class="RoundBookButton__roundButtonWrapper___XE_cU RoundBookButton__mobile___OJGZu SearchResult__bookButton___KC_GC">
                <div class="Price__priceWrapper___eDs_Y">
                  <span class="Price__voPriceText___HO0dB">$67.99</span><span class="RoundBookButton__iconOnlyCTAPrice___FRjpw">$67<sup>.99</sup></span>
                </div>
                <button type="button" class="hcr-btn-7-6-0 hcr-btn--secondary-7-6-0 hcr-btn--square-7-6-0 RoundBookButton__iconOnlyCTA___EK4X7" aria-label="Select this trip">
                  <span class="hci-icon hcr-btn__icon-7-6-0"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="SearchResult__uspsAndCapacity___XucTk">
            <div class="SearchResult__capacity___di8HI SearchResult__withDivider___hHjZX">
              <div class="RideCapacity__busCapacity___VoHUl RideCapacity__hasLabel___ekPDc">
                <span class="hci-icon RideCapacity__iconCapacity___mjkiC"></span><span class="RideCapacity__busCapacityText___xGKoW">Almost full</span>
              </div>
            </div>
            <div class="SearchResult__usps___xQu9R">
              <div class="Usps__uspIconContainers___LGw3v Usps__isMobile___XYcqi Usps__gray___j29Xg">
                <span class="hci-icon Usps__icon___Tez9X"></span><span class="hci-icon Usps__icon___Tez9X"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
  </body></html>
    `
  const handleKeyPress = (e: React.KeyboardEvent) => {
    switch (e.code) {
      case "Enter": onHandleGoTo(); break;
      default: break;
    }
  }

  const onHandleGoTo = () => {
    if (!inputValue) {
        console.log("Please input URL here!!!")
        return;
    }
    console.log(inputValue)
    setIsDisabled(true)
    // send url to backend
    try {
        navigate({ url: inputValue });
        console.log("Send url to backend...")
        setIsDisabled(false)
        inputRef.current && inputRef.current.blur()
      } catch (err) {
        console.error(err);
        return [];
      }
    // setTimeout(() => {
    //     console.log("Send url to backend...")
    //     setIsDisabled(false)
    //     inputRef.current && inputRef.current.blur()
    // }, 1000)
  }
  let param = "https://shop.greyhound.com/checkout"

  return (
    <div className={`mockup-window border bg-base-300 relative ${props.className}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 leading-[3rem] text-neutral-500">
        <Input
          placeholder="Input URL here."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => handleKeyPress(e)}
          style={{ width: '25vw' }}
          suffix={<button onClick={() => onHandleGoTo()} disabled={isDisabled} className={"btn btn-link p-0 border-0 h-min min-h-min disabled:bg-transparent"}>{isDisabled ? <Loading className="h-min min-h-min" /> : suffix}</button>}
          disabled={isDisabled}
          ref={inputRef}
        />
      </div>
      {/* <iframe src="https://course.buct.edu.cn/" className="h-[calc(100%-1.75rem)] w-[100%] bg-base-200 overflow-y-auto"/> */}
      {/* <object data={param} className="h-[calc(100%-1.75rem)] w-[100%] bg-base-200 overflow-y-auto"/> */}
      <div
        dangerouslySetInnerHTML={{ __html: props.html && typeof(props.html) === "string" ? props.html : defaultHTML }}
        className="h-[calc(100%-1.75rem)] bg-base-200 overflow-y-auto py-4 px-8"
      />
    </div>
  )
}

export default MockWindow;