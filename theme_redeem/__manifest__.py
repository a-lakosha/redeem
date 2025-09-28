{
    'name': 'Redeem Digital Wallet Theme',
    'version': '19.0.1.0.0',
    'sequence': 1,
    'category': 'Theme/Business',
    'summary': 'Digital wallet and financial services landing page theme',
    'description': """
Redeem Digital Wallet Theme
===========================
A modern, responsive theme designed for digital wallet and financial services landing pages.
Features clean design, mobile-first layout, and optimized conversion elements.

Key Features:
* Modern hero section with phone mockups
* Feature grid showcasing digital wallet capabilities
* Process flow visualization
* Automated fund management highlights
* Call-to-action sections optimized for conversion
* Fully responsive design
* Bootstrap 5 based styling
    """,
    'author': 'Pearl Pixels',
    'website': 'https://www.pearlpixels.com',
    'depends': ['theme_common'],
    'images': [
        'static/description/redeem_description.jpg',
        'static/description/redeem_screenshot.jpg',
    ],
    'data': [
        # Homepage template
        'data/home.xml',

        # Layout
        'data/footer.xml',
        'data/header.xml',

        # Theme assets and images
        'data/data.xml',

        # website menu structure
        'data/menu.xml',

    ],
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}
