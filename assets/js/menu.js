window.navigation = window.navigation || {},
function(n) {
 navigation.menu = {
 constants: {
 sectionTemplate: '.section-template',
 contentContainer: '#wrapper',
 startSectionMenuItem: '#intro',
 startSection: '#intro'
 },

 // looks for all imported html files and loads them into the #wrapper div so it can be found
 importSectionsToDOM: function() {
    const links = document.querySelectorAll('link[rel="import"]');
    
    Array.prototype.forEach.call(links, function (link) {
        let template = link.import.querySelector(navigation.menu.constants.sectionTemplate);
        let clone = document.importNode(template.content, true);
        document.querySelector(navigation.menu.constants.contentContainer).appendChild(clone);
    })
 },

 // Listens to menu click event: if the clicked, checks if fired event is
 // of our custom data-section type (dataset accesses any data- attribute and we use 
 // .keyname to then retrieve the value of the attribute with data-keyname)
 setMenuOnClickEvent: function () {
    document.body.addEventListener('click', function (event) {
    if (event.target.dataset.section) { // returns intro, prepano, pano, etc.
        navigation.menu.hideAllSections();
        navigation.menu.showSection(event);
       }
    })
 },

 // Uses jquery to directly show section by appending # to keyname
 showSection: function(event) {
    const sectionId = event.target.dataset.section;
    console.log('#' + sectionId + ' showed');
    $('#' + sectionId).show(); // displays entire html with section id
    $('#' + sectionId + ' section').show(); // displays section element with that id
 },

 showStartSection: function() {
    $(this.constants.startSectionMenuItem).click();
    navigation.menu.hideAllSections();
    console.log(this.constants.startSectionMenuItem + ' clicked');
    $(this.constants.startSection).show();
    console.log(this.constants.startSection + ' showed');
    $(this.constants.startSection + ' section').show();
 },

 hideAllSections: function() {
    $(this.constants.contentContainer + ' section').hide();
 },

 init: function() {
    this.importSectionsToDOM();
    this.setMenuOnClickEvent();
    this.showStartSection();
}
 };

 n(function() {
    navigation.menu.init();
 })

}(jQuery);